import { Mail, MailContact, MailDirectContent, MailjetConfig } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, Transport } from "./transport.js";
import { Client, SendEmailV3_1 } from "node-mailjet";
import { createTemplateCompiler, TemplateCompiler } from "@mailtura/contentcompiler";

export type EmailData = { Name?: string; Email: string };

export function createMailjetTransport(config: MailjetConfig, tenantId: string): Transport {
  return new MailjetTransport(config, tenantId);
}

class MailjetTransport extends AbstractTransport {
  readonly #config: MailjetConfig;

  constructor(config: MailjetConfig, tenantId: string) {
    super(tenantId);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const mailjet = new Client({
      apiKey: this.#config.apiKey,
      apiSecret: this.#config.apiSecret,
    });

    const content = await this.getTemplateContent(mail.content);

    const templateCompiler = createTemplateCompiler(async () => undefined, "");
    const messages = await this.#createMessages(mail, templateCompiler, content);

    try {
      const result = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: messages,
      });
      console.log(result.body);
    } catch (error: any) {
      console.error(error);
    }

    return messages.length;
  }

  async #createMessages(
    mail: Mail,
    templateCompiler: TemplateCompiler,
    content: MailDirectContent
  ): Promise<SendEmailV3_1.Message[]> {
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
  ): Promise<SendEmailV3_1.Message[]> {
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
          From: from,
          To: this.#mapMailAddresses(recipient.to) ?? [],
          Cc: this.#mapMailAddresses(recipient.cc),
          Bcc: this.#mapMailAddresses(recipient.bcc),
          Subject: mail.subject,
          HTMLPart: resolvedTemplate.html,
          TextPart: resolvedTemplate.text,
        };
      })
    );
  }

  async #createJoinedMessages(mail: Mail, templateCompiler: TemplateCompiler): Promise<SendEmailV3_1.Message[]> {
    const resolvedTemplate = await templateCompiler.resolveTemplate(mail.content, mail.substitutions ?? {});
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.join("\n"));
    }
    const from = this.#mapMailAddress(mail.from);
    return [
      {
        From: from,
        To: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.to) ?? []),
        Cc: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.cc) ?? []),
        Bcc: mail.recipients.flatMap(recipient => this.#mapMailAddresses(recipient.bcc) ?? []),
        Subject: mail.subject,
        HTMLPart: resolvedTemplate.html,
        TextPart: resolvedTemplate.text,
      },
    ];
  }

  #mapMailAddresses(contacts: MailContact | MailContact[] | undefined): EmailData[] | undefined {
    if (!contacts) return undefined;
    return (!Array.isArray(contacts) ? [contacts] : contacts).map(contact => this.#mapMailAddress(contact));
  }

  #mapMailAddress(contact: MailContact): EmailData {
    return { Name: contact.name, Email: contact.email };
  }
}
