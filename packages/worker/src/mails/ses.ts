import { Mail, MailContact, MailDirectContent, SesConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, TransportConfig } from "./transport.js";
import { SendEmailCommand, SendEmailCommandInput, SESClient } from "@aws-sdk/client-ses";

type SendEmailRequest = SendEmailCommandInput;

export class SesTransport extends AbstractTransport<string> {
  readonly #config: SesConfig;

  constructor(config: SesConfig, tenantId: string, transportConfig: TransportConfig) {
    super(tenantId, transportConfig);
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

    const requests = await this.#createRequests(mail, content);

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

  async #createRequests(mail: Mail, content: MailDirectContent): Promise<SendEmailRequest[]> {
    if (!this.hasSubstitutions(mail)) return this.#createJoinedRequests(mail);
    return this.#createSubstitutedRequests(mail, content);
  }

  async #createSubstitutedRequests(mail: Mail, content: MailDirectContent): Promise<SendEmailRequest[]> {
    const from = this.mapMailAddress(mail.from);
    return Promise.all(
      mail.recipients.map(async recipient => {
        const substitutions = this.mergeSubstitutions(
          content.substitutions,
          mail.substitutions,
          recipient.substitutions
        );
        const resolvedTemplate = await this.resolveTemplate(mail, substitutions);
        if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
          throw new Error(resolvedTemplate.errors.join("\n"));
        }
        return {
          Source: from,
          Destination: {
            ToAddresses: this.mapMailAddresses(recipient.to),
            CcAddresses: this.mapMailAddresses(recipient.cc),
            BccAddresses: this.mapMailAddresses(recipient.bcc),
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

  async #createJoinedRequests(mail: Mail): Promise<SendEmailRequest[]> {
    const resolvedTemplate = await this.resolveTemplate(mail);
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.join("\n"));
    }
    const from = this.mapMailAddress(mail.from);
    return [
      {
        Source: from,
        Destination: {
          ToAddresses: mail.recipients.flatMap(recipient => this.mapMailAddresses(recipient.to)),
          CcAddresses: mail.recipients.flatMap(recipient => this.mapMailAddresses(recipient.cc)),
          BccAddresses: mail.recipients.flatMap(recipient => this.mapMailAddresses(recipient.bcc)),
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

  mapMailAddress(contact: MailContact): string {
    return contact.name ? `${contact.name} <${contact.email}>` : contact.email;
  }
}
