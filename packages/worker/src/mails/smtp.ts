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

export class SmtpTransport extends AbstractTransport<string | Address> {
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

    const from = this.mapMailAddress(mail.from);
    const deliveryPlan = await this.resolveDeliveryPlan(mail);
    return this.sendWithDeliveryPlan(deliveryPlan, async item => {
      const mailOptions: Options = {
        from,
        to: item.to,
        cc: item.cc,
        bcc: item.bcc,
        subject: mail.subject,
        html: item.html,
        text: item.text,
      };

      const messageInfo = await transport.sendMail(mailOptions);
      messageInfo.accepted.forEach(messageId => console.log(`Message ${messageId} accepted`));
    });
  }

  protected mapMailAddress(contact: MailContact): string | Address {
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
