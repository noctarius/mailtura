import { MailConfigEntity } from "@mailtura/database";
import { SmtpTransport } from "./smtp.js";
import { SendgridTransport } from "./sendgrid.js";
import { MailjetTransport } from "./mailjet.js";
import { MailgunTransport } from "./mailgun.js";
import { MailchimpTransport } from "./mailchimp.js";
import { SesTransport } from "./ses.js";
import {
  MailchimpConfig,
  MailgunConfig,
  MailjetConfig,
  SendgridConfig,
  SesConfig,
  SmtpConfig,
} from "@mailtura/rpcmodel/mails/index.js";
import { TransportConfig } from "./transport.js";

export function newMailTransport(mailConfig: MailConfigEntity, transportConfig: TransportConfig) {
  const tenantId = mailConfig.tenant_id;
  switch (mailConfig.type) {
    case "smtp": {
      const config = mailConfig.config as SmtpConfig;
      return new SmtpTransport(config, tenantId, transportConfig);
    }
    case "sendgrid": {
      const config = mailConfig.config as SendgridConfig;
      return new SendgridTransport(config, tenantId, transportConfig);
    }
    case "mailjet": {
      const config = mailConfig.config as MailjetConfig;
      return new MailjetTransport(config, tenantId, transportConfig);
    }
    case "mailgun": {
      const config = mailConfig.config as MailgunConfig;
      return new MailgunTransport(config, tenantId, transportConfig);
    }
    case "mailchimp": {
      const config = mailConfig.config as MailchimpConfig;
      return new MailchimpTransport(config, tenantId, transportConfig);
    }
    case "ses": {
      const config = mailConfig.config as SesConfig;
      return new SesTransport(config, tenantId, transportConfig);
    }
  }
}
