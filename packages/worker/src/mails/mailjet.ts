import { Mail, MailContact, MailDirectContent, MailjetConfig } from "@mailtura/rpcmodel/mails/index.js";
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

    const content = await this.getTemplateContent(mail.content);

    const messages = await this.#createMessages(mail, content);

    try {
      const payload = { Messages: messages } as SendEmailV3_1.Body;
      const result = await mailjet.post("send", { version: "v3.1" }).request(payload);
      console.log(result.body);
    } catch (error: unknown) {
      console.error(error);
    }

    return messages.length;
  }

  async #createMessages(mail: Mail, content: MailDirectContent): Promise<SendEmailV3_1_Message[]> {
    if (!this.hasSubstitutions(mail)) return this.#createJoinedMessages(mail);
    return this.#createSubstitutedMessages(mail, content);
  }

  async #createSubstitutedMessages(mail: Mail, content: MailDirectContent): Promise<SendEmailV3_1_Message[]> {
    const from = this.mapMailAddress(mail.from);
    return Promise.all(
      mail.recipients.map(async recipient => {
        const substitutions = this.mergeSubstitutions(
          content.substitutions,
          mail.substitutions,
          recipient.substitutions
        );
        const resolvedTemplate = await this.resolveTemplate(mail, substitutions);
        return {
          From: from,
          To: this.mapMailAddresses(recipient.to),
          Cc: this.mapMailAddresses(recipient.cc),
          Bcc: this.mapMailAddresses(recipient.bcc),
          Subject: mail.subject,
          HTMLPart: resolvedTemplate.html,
          TextPart: resolvedTemplate.text,
        } as SendEmailV3_1_Message;
      })
    );
  }

  async #createJoinedMessages(mail: Mail): Promise<SendEmailV3_1_Message[]> {
    const resolvedTemplate = await this.resolveTemplate(mail);
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.join("\n"));
    }
    const from = this.mapMailAddress(mail.from);
    return [
      {
        From: from,
        To: mail.recipients.flatMap(recipient => this.mapMailAddresses(recipient.to)),
        Cc: mail.recipients.flatMap(recipient => this.mapMailAddresses(recipient.cc)),
        Bcc: mail.recipients.flatMap(recipient => this.mapMailAddresses(recipient.bcc)),
        Subject: mail.subject,
        HTMLPart: resolvedTemplate.html,
        TextPart: resolvedTemplate.text,
      } as SendEmailV3_1_Message,
    ];
  }

  protected mapMailAddress(contact: MailContact): EmailData {
    return { Name: contact.name, Email: contact.email };
  }
}
