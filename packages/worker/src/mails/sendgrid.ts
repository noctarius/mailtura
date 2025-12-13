import { Mail, MailContact, MailDirectContent, SendgridConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, Transport } from "./transport.js";
import { Client } from "@sendgrid/client";
import { classes } from "@sendgrid/helpers";
import { createTemplateCompiler, TemplateCompiler } from "@mailtura/contentcompiler";

const SendgridMail = classes.Mail;
type SendgridMail = typeof SendgridMail;
type MailData = NonNullable<ConstructorParameters<SendgridMail>[0]>;

export type EmailData = { name?: string; email: string };

export function createSendgridTransport(config: SendgridConfig, tenantId: string): Transport {
  return new SendgridTransport(config, tenantId);
}

class SendgridTransport extends AbstractTransport {
  readonly #config: SendgridConfig;

  constructor(config: SendgridConfig, tenantId: string) {
    super(tenantId);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const client = new Client();

    client.setDataResidency(this.#config.region ?? "global");
    client.setApiKey(this.#config.apiKey);

    if (this.#config.subuser) {
      client.setImpersonateSubuser(this.#config.subuser);
    }

    const content = await this.getTemplateContent(mail.content);
    console.log(content);

    const templateCompiler = createTemplateCompiler(async () => undefined, "");
    const mailData = await this.#createMails(mail, templateCompiler, content);
    for (const mail of mailData) {
      try {
        const [response, body] = await client.request({
          method: "POST",
          url: "/v3/mail/send",
          body: SendgridMail.create(mail).toJSON(),
        });
        if (response.statusCode >= 200 && response.statusCode < 300) console.log(response.body);
      } catch (error: any) {
        console.error(error);
      }
    }
    return mailData.length === 1
      ? mailData.reduce((acc, item) => acc + (item.personalizations?.length ?? 0), 0)
      : mailData.length;
  }

  async #createMails(mail: Mail, templateCompiler: TemplateCompiler, content: MailDirectContent): Promise<MailData[]> {
    const hasSubstitutions = mail.recipients.some(
      recipient => recipient.substitutions && Object.keys(recipient.substitutions).length > 0
    );

    if (!hasSubstitutions) return this.#createJoinedMail(mail, templateCompiler);
    return this.#createSubstitutedMails(mail, templateCompiler, content);
  }

  async #createSubstitutedMails(
    mail: Mail,
    templateCompiler: TemplateCompiler,
    content: MailDirectContent
  ): Promise<MailData[]> {
    const from = this.#mapMailAddress(mail.from);
    return Promise.all(
      mail.recipients.map(async recipient => {
        const substitutions = this.mergeSubstitutions(
          content.substitutions,
          mail.substitutions,
          recipient.substitutions
        );
        const resolvedTemplate = await templateCompiler.resolveTemplate(mail.content, substitutions);
        return {
          from,
          subject: mail.subject,
          html: resolvedTemplate.html,
          text: resolvedTemplate.text,
          personalizations: mail.recipients.map(recipient => {
            return {
              to: this.#mapMailAddresses(recipient.to) ?? [],
              cc: this.#mapMailAddresses(recipient.cc),
              bcc: this.#mapMailAddresses(recipient.bcc),
            };
          }),
        };
      })
    );
  }

  async #createJoinedMail(mail: Mail, templateCompiler: TemplateCompiler): Promise<MailData[]> {
    const resolvedTemplate = await templateCompiler.resolveTemplate(mail.content, mail.substitutions ?? {});
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.join("\n"));
    }
    const from = this.#mapMailAddress(mail.from);
    return [
      {
        from,
        subject: mail.subject,
        html: resolvedTemplate.html,
        text: resolvedTemplate.text,
        personalizations: mail.recipients.map(recipient => {
          return {
            to: this.#mapMailAddresses(recipient.to) ?? [],
            cc: this.#mapMailAddresses(recipient.cc),
            bcc: this.#mapMailAddresses(recipient.bcc),
          };
        }),
      },
    ];
  }

  #mapMailAddresses(contacts: MailContact | MailContact[] | undefined): EmailData[] | undefined {
    if (!contacts) return undefined;
    return (!Array.isArray(contacts) ? [contacts] : contacts).map(contact => this.#mapMailAddress(contact));
  }

  #mapMailAddress(contact: MailContact): EmailData {
    return { name: contact.name, email: contact.email };
  }
}
