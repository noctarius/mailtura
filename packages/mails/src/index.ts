import type { Transport, TransportConfig } from "./transport/index.js";
import { SmtpTransport } from "./transport/smtp/transport.js";
import { SendgridTransport } from "./transport/sendgrid/transport.js";
import { MailjetTransport } from "./transport/mailjet/transport.js";
import { MailgunTransport } from "./transport/mailgun/transport.js";
import { MailchimpTransport } from "./transport/mailchimp/transport.js";
import { SesTransport } from "./transport/ses/transport.js";
import {
  MailchimpConfig,
  MailgunConfig,
  MailjetConfig,
  SendgridConfig,
  SesConfig,
  SmtpConfig,
} from "@mailtura/rpcmodel/mails/index.js";
import type { MailConfigEntity } from "@mailtura/database";

export * from "./transport/index.js";

export function newMailTransport(mailConfig: MailConfigEntity, transportConfig: TransportConfig): Transport {
  switch (mailConfig.type) {
    case "smtp": {
      const config = mailConfig.config as SmtpConfig;
      return new SmtpTransport(config, transportConfig);
    }
    case "sendgrid": {
      const config = mailConfig.config as SendgridConfig;
      return new SendgridTransport(config, transportConfig);
    }
    case "mailjet": {
      const config = mailConfig.config as MailjetConfig;
      return new MailjetTransport(config, transportConfig);
    }
    case "mailgun": {
      const config = mailConfig.config as MailgunConfig;
      return new MailgunTransport(config, transportConfig);
    }
    case "mailchimp": {
      const config = mailConfig.config as MailchimpConfig;
      return new MailchimpTransport(config, transportConfig);
    }
    case "ses": {
      const config = mailConfig.config as SesConfig;
      return new SesTransport(config, transportConfig);
    }
  }
  throw new Error(`Unsupported mail transport type: ${mailConfig.type}`);
}
