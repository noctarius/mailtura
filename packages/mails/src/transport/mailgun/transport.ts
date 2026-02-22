import { Mail, MailContact, MailgunConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, type DeliveryPlan, type TransportConfig } from "../transport/index.js";
import Mailgun from "mailgun.js";
import FormData from "form-data";

type MailgunMessageData = Parameters<ReturnType<Mailgun["client"]>["messages"]["create"]>[1];

export class MailgunTransport extends AbstractTransport<string> {
  protected readonly providerId = "mailgun";
  readonly #config: MailgunConfig;

  constructor(config: MailgunConfig, transportConfig: TransportConfig) {
    super(transportConfig);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: this.#config.apiKey,
    });

    const from = this.mapMailAddress(mail.from);
    const deliveryPlan = await this.resolveDeliveryPlan(mail);
    return this.sendWithDeliveryPlan(deliveryPlan, async item => {
      const message = this.#makeMessage(from, mail, item);
      const result = await mg.messages.create(this.#config.domain, message);
      return { providerMailId: result.id };
    });
  }

  protected mapMailAddress(contact: MailContact): string {
    return contact.name ? `${contact.name} <${contact.email}>` : contact.email;
  }

  #makeMessage(from: string, mail: Mail, item: DeliveryPlan<string>): MailgunMessageData {
    return {
      from,
      to: item.to,
      cc: item.cc,
      bcc: item.bcc,
      subject: mail.subject,
      html: item.html,
      text: item.text,
    };
  }
}
