import { proxyActivities } from "@temporalio/workflow";
import * as sendMail from "../activities/send-mail-activity.js";
import type { SendMailArguments } from "@mailtura/rpcmodel/tasks/index.js";

const { sendMailBatch } = proxyActivities<typeof sendMail>({
  startToCloseTimeout: "5min",
});

export async function sendMailWorkflow(tenantId: string, mailSendingId: string): Promise<void> {
  console.log(`Starting mail send for tenant ${tenantId} with id ${mailSendingId}`);
  const config: SendMailArguments = {
    mail_sending_id: mailSendingId,
    tenant_id: tenantId,
    batch_size: 100,
  };

  while (true) {
    const processedRecords = await sendMailBatch(config);
    if (processedRecords < 100) {
      console.log(`Mail send for tenant ${tenantId} with id ${mailSendingId} completed`);
      break;
    }
  }
}
