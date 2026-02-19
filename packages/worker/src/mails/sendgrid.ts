import { Mail, MailContact, SendgridConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, TransportConfig } from "./transport.js";
import { Client } from "@sendgrid/client";
import { classes } from "@sendgrid/helpers";

const SendgridMail = classes.Mail;
type SendgridMail = typeof SendgridMail;
type MailData = NonNullable<ConstructorParameters<SendgridMail>[0]>;
type EmailData = NonNullable<MailData["from"]>;

export class SendgridTransport extends AbstractTransport<EmailData> {
  readonly #config: SendgridConfig;

  constructor(config: SendgridConfig, tenantId: string, transportConfig: TransportConfig) {
    super(tenantId, transportConfig);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const client = new Client();

    client.setDataResidency(this.#config.region ?? "global");
    client.setApiKey(this.#config.apiKey);

    if (this.#config.subuser) {
      client.setImpersonateSubuser(this.#config.subuser);
    }

    const from = this.mapMailAddress(mail.from);
    const deliveryPlan = await this.resolveDeliveryPlan(mail);
    return this.sendWithDeliveryPlan(deliveryPlan, async item => {
      const mailData: MailData = {
        from,
        subject: mail.subject,
        html: item.html,
        text: item.text,
        personalizations: [
          {
            to: item.to,
            cc: item.cc,
            bcc: item.bcc,
          },
        ],
      };
      const [response] = await client.request({
        method: "POST",
        url: "/v3/mail/send",
        body: SendgridMail.create(mailData).toJSON(),
      });
      if (response.statusCode >= 200 && response.statusCode < 300) console.log(response.body);
    });
  }

  protected mapMailAddress(contact: MailContact): EmailData {
    return { name: contact.name, email: contact.email };
  }
}
