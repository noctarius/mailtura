import { Mail, MailchimpConfig, MailContact, MailDirectContent } from "@mailtura/rpcmodel/mails/index.js";
import { AbstractTransport, RecipientType, TransportConfig } from "./transport.js";
import mailchimp from "@mailchimp/mailchimp_transactional";

type MailchimpClient = ReturnType<typeof mailchimp>;
type Message = Parameters<MailchimpClient["messages"]["send"]>[0]["message"];
type Recipient = Message["to"][number];

export class MailchimpTransport extends AbstractTransport<Recipient> {
  readonly #config: MailchimpConfig;

  constructor(config: MailchimpConfig, tenantId: string, transportConfig: TransportConfig) {
    super(tenantId, transportConfig);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const client = mailchimp(this.#config.apiKey);

    const content = await this.getTemplateContent(mail.content);

    const messages = await this.#createMessages(mail, content);

    for (const message of messages) {
      try {
        const response = await client.messages.send({ message });
        console.log(response);
      } catch (error: unknown) {
        console.error(error);
      }
    }

    return messages.length;
  }

  async #createMessages(mail: Mail, content: MailDirectContent): Promise<Message[]> {
    if (!this.hasSubstitutions(mail)) return this.#createJoinedMessages(mail);
    return this.#createSubstitutedMessages(mail, content);
  }

  async #createSubstitutedMessages(mail: Mail, content: MailDirectContent): Promise<Message[]> {
    return Promise.all(
      mail.recipients.map(async recipient => {
        const substitutions = this.mergeSubstitutions(
          content.substitutions,
          mail.substitutions,
          recipient.substitutions
        );
        const resolvedTemplate = await this.resolveTemplate(mail, substitutions);
        return {
          from_email: mail.from.email,
          from_name: mail.from.name,
          to: this.mapMailAddresses(recipient.to, "to")
            .concat(this.mapMailAddresses(recipient.cc, "cc"))
            .concat(this.mapMailAddresses(recipient.bcc, "bcc")),
          subject: mail.subject,
          html: resolvedTemplate.html,
          text: resolvedTemplate.text,
        };
      })
    );
  }

  async #createJoinedMessages(mail: Mail): Promise<Message[]> {
    const resolvedTemplate = await this.resolveTemplate(mail);
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.join("\n"));
    }
    return [
      {
        from_email: mail.from.email,
        from_name: mail.from.name,
        to: mail.recipients.flatMap(recipient =>
          this.mapMailAddresses(recipient.to, "to")
            .concat(this.mapMailAddresses(recipient.cc, "cc"))
            .concat(this.mapMailAddresses(recipient.bcc, "bcc"))
        ),
        subject: mail.subject,
        html: resolvedTemplate.html,
        text: resolvedTemplate.text,
      },
    ];
  }

  protected override mapMailAddress(contact: MailContact, type?: RecipientType): mailchimp.MessageRecipient {
    return {
      email: contact.email,
      name: contact.name,
      type: type,
    };
  }
}
