import { Mail, MailContact, MailDirectContent, MailgunConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, TransportConfig } from "./transport.js";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import { createTemplateCompiler, TemplateCompiler } from "@mailtura/contentcompiler";

type MailgunMessageData = Parameters<ReturnType<Mailgun["client"]>["messages"]["create"]>[1];

export class MailgunTransport extends AbstractTransport {
  readonly #config: MailgunConfig;

  constructor(config: MailgunConfig, tenantId: string, transportConfig: TransportConfig) {
    super(tenantId, transportConfig);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: this.#config.apiKey,
    });

    const content = await this.getTemplateContent(mail.content);

    const templateCompiler = this.createContentCompiler();
    const messages = await this.#createMessages(mail, templateCompiler, content);

    for (const message of messages) {
      try {
        const result = await mg.messages.create(this.#config.domain, message);
        console.log(result);
      } catch (error: unknown) {
        console.error(error);
      }
    }

    return messages.length;
  }

  async #createMessages(
    mail: Mail,
    templateCompiler: TemplateCompiler,
    content: MailDirectContent
  ): Promise<MailgunMessageData[]> {
    const hasSubstitutions = mail.recipients.some(
      recipient => recipient.substitutions && Object.keys(recipient.substitutions).length > 0
    );

    if (!hasSubstitutions) return this.#createJoinedMessages(mail, templateCompiler);
    return this.#createSubstitutedMessages(mail, templateCompiler, content);
  }

  async #createSubstitutedMessages(
    mail: Mail,
    templateCompiler: TemplateCompiler,
    content: MailDirectContent
  ): Promise<MailgunMessageData[]> {
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
          to: this.#mapMailAddresses(recipient.to) ?? [],
          cc: this.#mapMailAddresses(recipient.cc),
          bcc: this.#mapMailAddresses(recipient.bcc),
          subject: mail.subject,
          html: resolvedTemplate.html,
          text: resolvedTemplate.text,
        };
      })
    );
  }

  async #createJoinedMessages(mail: Mail, templateCompiler: TemplateCompiler): Promise<MailgunMessageData[]> {
    const resolvedTemplate = await templateCompiler.resolveTemplate(mail.content, mail.substitutions ?? {});
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.join("\n"));
    }
    const from = this.#mapMailAddress(mail.from);
    return [
      {
        from,
        to: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.to) ?? []),
        cc: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.cc) ?? []),
        bcc: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.bcc) ?? []),
        subject: mail.subject,
        html: resolvedTemplate.html,
        text: resolvedTemplate.text,
      },
    ];
  }

  #mapMailAddresses(contacts: MailContact | MailContact[] | undefined): string[] | undefined {
    if (!contacts) return undefined;
    return (!Array.isArray(contacts) ? [contacts] : contacts).map(contact => this.#mapMailAddress(contact));
  }

  #mapMailAddress(contact: MailContact): string {
    return contact.name ? `${contact.name} <${contact.email}>` : contact.email;
  }
}
