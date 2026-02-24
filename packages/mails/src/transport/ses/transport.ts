import { type DirectMailContact, SesConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, type DeliveryPlan, type DirectMail, type TransportConfig } from "../index.js";
import { SendEmailCommand, type SendEmailCommandInput, SESv2Client } from "@aws-sdk/client-sesv2";

type SendEmailRequest = SendEmailCommandInput;

export class SesTransport extends AbstractTransport<string> {
  protected readonly providerId = "ses";
  readonly #config: SesConfig;

  constructor(config: SesConfig, transportConfig: TransportConfig) {
    super(transportConfig);
    this.#config = config;
  }

  async send(mail: DirectMail): Promise<number> {
    const client = new SESv2Client({
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
      const request = this.#makeRequest(from, mail, item);
      const command = new SendEmailCommand(request);
      const response = await client.send(command);
      return { providerMailId: response.MessageId ?? undefined };
    });
  }

  #makeRequest(from: string, mail: DirectMail, item: DeliveryPlan<string>): SendEmailRequest {
    return {
      FromEmailAddress: from,
      Destination: {
        ToAddresses: item.to,
        CcAddresses: item.cc,
        BccAddresses: item.bcc,
      },
      Content: {
        Simple: {
          Subject: { Data: mail.subject },
          Body: {
            Html: { Data: item.html },
            Text: { Data: item.text },
          },
          Headers: [],
        },
      },
    };
  }

  mapMailAddress(contact: DirectMailContact): string {
    return contact.name ? `${contact.name} <${contact.email}>` : contact.email;
  }
}
