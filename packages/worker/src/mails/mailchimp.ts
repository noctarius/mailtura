import { Mail, MailchimpConfig, MailContact } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, DeliveryPlan, RecipientType, TransportConfig } from "./transport.js";
import mailchimp from "@mailchimp/mailchimp_transactional";

type MailchimpClient = ReturnType<typeof mailchimp>;
type Message = Parameters<MailchimpClient["messages"]["send"]>[0]["message"];
type Recipient = Message["to"][number];

export class MailchimpTransport extends AbstractTransport<Recipient> {
  protected readonly providerId = "mailchimp";
  readonly #config: MailchimpConfig;

  constructor(config: MailchimpConfig, tenantId: string, transportConfig: TransportConfig) {
    super(tenantId, transportConfig);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const client = mailchimp(this.#config.apiKey);

    const deliveryPlan = await this.resolveDeliveryPlan(mail);
    return this.sendWithDeliveryPlan(deliveryPlan, async item => {
      const message = this.#makeMessage(mail, item);
      const response = await client.messages.send({ message });
      const first = (response as Array<{ _id?: string }> | undefined)?.[0];
      return { providerMailId: first?._id };
    });
  }

  protected override mapMailAddress(contact: MailContact, type?: RecipientType): mailchimp.MessageRecipient {
    return {
      email: contact.email,
      name: contact.name,
      type: type,
    };
  }

  #makeMessage(mail: Mail, item: DeliveryPlan<Recipient>): Message {
    return {
      from_email: mail.from.email,
      from_name: mail.from.name,
      to: item.to.concat(item.cc).concat(item.bcc),
      subject: mail.subject,
      html: item.html,
      text: item.text,
    };
  }
}
