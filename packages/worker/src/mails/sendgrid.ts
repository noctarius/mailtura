import { Mail, MailContact, SendgridConfig } from "@mailtura/rpcmodel/lib/mails/index.js";
import { AbstractTransport, Transport } from "./transport.js";
import { Client } from "@sendgrid/client";
import Handlebars from "handlebars";
import { convert } from "html-to-text";
import { classes } from "@sendgrid/helpers";

const SendgridMail = classes.Mail;

export type EmailData = { name?: string; email: string };

export function createTransport(config: SendgridConfig, tenantId: string): Transport {
  return new SendgridTransport(config, tenantId);
}

class SendgridTransport extends AbstractTransport {
  readonly #config: SendgridConfig;

  constructor(config: SendgridConfig, tenantId: string) {
    super(tenantId);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const client = new Client();

    client.setDataResidency(this.#config.region ?? "global");
    client.setApiKey(this.#config.apiKey);

    if (this.#config.subuser) {
      client.setImpersonateSubuser(this.#config.subuser);
    }

    const from = this.#mapMailAddress(mail.from);
    const content = await this.getTemplateContent(mail.content);
    const htmlTemplate = Handlebars.com


    for (const recipient of mail.recipients) {
      const substitutions = this.mergeSubstitutions(content.substitutions, mail.substitutions, recipient.substitutions);

      const to = this.#mapMailAddresses(recipient.to);
      const cc = this.#mapMailAddresses(recipient.cc);
      const bcc = this.#mapMailAddresses(recipient.bcc);

      const html = content.isTemplate ? Handlebars.render(content.content, substitutions) : content.content;
      const text = content.textContent
        ? content.isTemplate
          ? Handlebars.render(content.textContent, substitutions)
          : content.textContent
        : convert(html, { wordwrap: 120 });

      const mailData = new SendgridMail();
      mailData.setFrom(from);
      mailData.setSubject(mail.subject);
      mailData.setSubstitutions(substitutions);
      mailData.addHtmlContent(html);
      mailData.addTextContent(text);
      mailData.addPersonalization({
        to: to ?? [],
        cc,
        bcc,
      });

      const response = await client.createRequest({
        method: "POST",
        url: "/v3/mail/send",
        body: mailData.toJSON(),
      });

    }
    return 0;
  }

  #mapMailAddresses(contacts: MailContact | MailContact[] | undefined): EmailData[] | undefined {
    if (!contacts) return undefined;
    return (!Array.isArray(contacts) ? [contacts] : contacts).map(contact => this.#mapMailAddress(contact));
  }

  #mapMailAddress(contact: MailContact): EmailData {
    return { name: contact.name, email: contact.email };
  }
}
