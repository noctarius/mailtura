import { MailConfigEntity } from "@mailtura/database";
import { createSmtpTransport } from "./smtp.js";
import { createSendgridTransport } from "./sendgrid.js";
import { SendgridConfig, SmtpConfig } from "@mailtura/rpcmodel/mails/index.js";

export function newMailTransport(mailConfig: MailConfigEntity) {
  const tenantId = mailConfig.tenant_id;
  switch (mailConfig.type) {
    case "smtp": {
      const config = mailConfig.config as SmtpConfig;
      return createSmtpTransport(config, tenantId);
    }
    case "sendgrid": {
      const config = mailConfig.config as SendgridConfig;
      return createSendgridTransport(config, tenantId);
    }
  }
}
