import {
  ClientOauth2SmtpAuth,
  isClientOauth2Auth,
  isServiceOauth2Auth,
  isUsernamePasswordAuth,
  Mail,
  MailContact,
  ServiceOauth2SmtpAuth,
  SmtpConfig,
  type UsernamePasswordSmtpAuth,
} from "@mailtura/rpcmodel/mails/index.js";
import { createTransport as createNodemailerTransport } from "nodemailer";
import { Address, Options } from "nodemailer/lib/mailer/index.js";
import { AbstractTransport, TransportConfig } from "./transport.js";

export class SmtpTransport extends AbstractTransport {
  readonly #config: SmtpConfig;

  constructor(config: SmtpConfig, tenantId: string, transportConfig: TransportConfig) {
    super(tenantId, transportConfig);
    this.#config = config;
  }

  async send(mail: Mail): Promise<number> {
    const transport = createNodemailerTransport({
      host: this.#config.host,
      port: this.#config.port,
      secure: this.#config.secure,
      pool: true,
      maxConnections: this.#config.maxConnections,
      maxMessages: this.#config.maxMessages,
      auth: this.#createAuthConfig(),
    });

    const from = this.#mapMailAddress(mail.from);
    const content = await this.getTemplateContent(mail.content);

    for (const recipient of mail.recipients) {
      const substitutions = this.mergeSubstitutions(content.substitutions, mail.substitutions, recipient.substitutions);
      const resolvedTemplate = await this.resolveTemplate(mail, substitutions);

      const mailOptions: Options = {
        from,
        to: this.#mapMailAddresses(recipient.to),
        cc: this.#mapMailAddresses(recipient.cc),
        bcc: this.#mapMailAddresses(recipient.bcc),
        subject: mail.subject,
        html: resolvedTemplate.html,
        text: resolvedTemplate.text,
      };

      const messageInfo = await transport.sendMail(mailOptions);
      messageInfo.accepted.forEach(messageId => console.log(`Message ${messageId} accepted`));
    }

    return 0;
  }

  #mapMailAddresses(contacts: MailContact | MailContact[] | undefined): (string | Address)[] | undefined {
    if (!contacts) return undefined;
    return (!Array.isArray(contacts) ? [contacts] : contacts).map(contact => this.#mapMailAddress(contact));
  }

  #mapMailAddress(contact: MailContact): string | Address {
    return contact.name ? { name: contact.name, address: contact.email } : contact.email;
  }

  #createAuthConfig() {
    const auth = this.#config.auth;
    if (isUsernamePasswordAuth(auth)) return this.#createUsernamePasswordAuthConfig(auth);
    else if (isClientOauth2Auth(auth)) return this.#createClientOauth2AuthConfig(auth);
    else if (isServiceOauth2Auth(auth)) return this.#createServiceOauth2AuthConfig(auth);
    else throw new Error("Unsupported auth type");
  }

  #createUsernamePasswordAuthConfig(config: UsernamePasswordSmtpAuth) {
    return {
      user: config.username,
      pass: config.password,
    };
  }

  #createClientOauth2AuthConfig(config: ClientOauth2SmtpAuth) {
    return {
      accessToken: config.accessToken,
      refreshToken: config.refreshToken,
      accessUrl: config.accessUrl,
      user: config.username,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      expires: config.expiresAt,
    };
  }

  #createServiceOauth2AuthConfig(config: ServiceOauth2SmtpAuth) {
    return {
      user: config.username,
      serviceClient: config.serviceClient,
      privateKey: config.privateKeyId,
    };
  }
}
