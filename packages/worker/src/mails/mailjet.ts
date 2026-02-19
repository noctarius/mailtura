import { Mail, MailContact, MailjetConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, TransportConfig } from "./transport.js";
import type { SendEmailV3_1 } from "node-mailjet";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Mailjet = require("node-mailjet") as {
  apiConnect: (
    apiKey: string,
    apiSecret: string
  ) => {
    post: (
      resource: string,
      config?: { version?: string }
    ) => {
      request: (body: SendEmailV3_1.Body) => Promise<{ body: unknown }>;
    };
  };
};

type SendEmailV3_1_Message = SendEmailV3_1.Message;
export type EmailData = SendEmailV3_1.EmailAddressTo;

export class MailjetTransport extends AbstractTransport<EmailData> {
  readonly #config: MailjetConfig;

  constructor(config: MailjetConfig, tenantId: string, transportConfig: TransportConfig) {
    super(tenantId, transportConfig);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const mailjet = Mailjet.apiConnect(this.#config.apiKey, this.#config.apiSecret);

    const from = this.mapMailAddress(mail.from);
    const deliveryPlan = await this.resolveDeliveryPlan(mail);
    return this.sendWithDeliveryPlan(deliveryPlan, async item => {
      const message: SendEmailV3_1_Message = {
        From: from,
        To: item.to,
        Cc: item.cc,
        Bcc: item.bcc,
        Subject: mail.subject,
        HTMLPart: item.html,
        TextPart: item.text,
      };
      const payload = { Messages: [message] } as SendEmailV3_1.Body;
      const result = await mailjet.post("send", { version: "v3.1" }).request(payload);
      console.log(result.body);
    });
  }

  protected mapMailAddress(contact: MailContact): EmailData {
    return { Name: contact.name, Email: contact.email };
  }
}
