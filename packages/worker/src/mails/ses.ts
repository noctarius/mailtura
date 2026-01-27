import { Mail, MailContact, MailDirectContent, SesConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, Transport } from "./transport.js";
import { SendEmailCommand, SESClient, SendEmailCommandInput } from "@aws-sdk/client-ses";
import { createTemplateCompiler, TemplateCompiler } from "@mailtura/contentcompiler";

type SendEmailRequest = SendEmailCommandInput;

export function createSesTransport(config: SesConfig, tenantId: string): Transport {
  return new SesTransport(config, tenantId);
}

class SesTransport extends AbstractTransport {
  readonly #config: SesConfig;

  constructor(config: SesConfig, tenantId: string) {
    super(tenantId);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const client = new SESClient({
      region: this.#config.region,
      credentials: {
        accessKeyId: this.#config.accessKeyId,
        secretAccessKey: this.#config.secretAccessKey,
        sessionToken: this.#config.sessionToken,
      },
    });

    const content = await this.getTemplateContent(mail.content);

    const templateCompiler = createTemplateCompiler(async () => undefined, "");
    const requests = await this.#createRequests(mail, templateCompiler, content);

    for (const request of requests) {
      try {
        const command = new SendEmailCommand(request);
        const response = await client.send(command);
        console.log(response);
      } catch (error: unknown) {
        console.error(error);
      }
    }

    return requests.length;
  }

  async #createRequests(
    mail: Mail,
    templateCompiler: TemplateCompiler,
    content: MailDirectContent
  ): Promise<SendEmailRequest[]> {
    const hasSubstitutions = mail.recipients.some(
      recipient => recipient.substitutions && Object.keys(recipient.substitutions).length > 0
    );

    if (!hasSubstitutions) return this.#createJoinedRequests(mail, templateCompiler);
    return this.#createSubstitutedRequests(mail, templateCompiler, content);
  }

  async #createSubstitutedRequests(
    mail: Mail,
    templateCompiler: TemplateCompiler,
    content: MailDirectContent
  ): Promise<SendEmailRequest[]> {
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
          Source: from,
          Destination: {
            ToAddresses: this.#mapMailAddresses(recipient.to),
            CcAddresses: this.#mapMailAddresses(recipient.cc),
            BccAddresses: this.#mapMailAddresses(recipient.bcc),
          },
          Message: {
            Subject: { Data: mail.subject },
            Body: {
              Html: { Data: resolvedTemplate.html },
              Text: { Data: resolvedTemplate.text },
            },
          },
        };
      })
    );
  }

  async #createJoinedRequests(mail: Mail, templateCompiler: TemplateCompiler): Promise<SendEmailRequest[]> {
    const resolvedTemplate = await templateCompiler.resolveTemplate(mail.content, mail.substitutions ?? {});
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.join("\n"));
    }
    const from = this.#mapMailAddress(mail.from);
    return [
      {
        Source: from,
        Destination: {
          ToAddresses: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.to) ?? []),
          CcAddresses: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.cc) ?? []),
          BccAddresses: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.bcc) ?? []),
        },
        Message: {
          Subject: { Data: mail.subject },
          Body: {
            Html: { Data: resolvedTemplate.html },
            Text: { Data: resolvedTemplate.text },
          },
        },
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
