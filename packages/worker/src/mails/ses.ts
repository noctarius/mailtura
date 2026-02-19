import { Mail, MailContact, SesConfig } from "@mailtura/rpcmodel/mails/index.js";
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

    const from = this.mapMailAddress(mail.from);
    const deliveryPlan = await this.resolveDeliveryPlan(mail);
    return this.sendWithDeliveryPlan(deliveryPlan, async item => {
      const request: SendEmailRequest = {
        Source: from,
        Destination: {
          ToAddresses: item.to,
          CcAddresses: item.cc,
          BccAddresses: item.bcc,
        },
        Message: {
          Subject: { Data: mail.subject },
          Body: {
            Html: { Data: item.html },
            Text: { Data: item.text },
          },
        },
      };
      const command = new SendEmailCommand(request);
      const response = await client.send(command);
      console.log(response);
    });
  }

  mapMailAddress(contact: MailContact): string {
    return contact.name ? `${contact.name} <${contact.email}>` : contact.email;
  }
}
