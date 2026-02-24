import {
  SMTPServer,
  type SMTPServerAuthentication,
  type SMTPServerAuthenticationResponse,
  type SMTPServerDataStream,
  type SMTPServerSession,
} from "smtp-server";
import { simpleParser } from "mailparser";
import { validateApiKey } from "../auth/apiKey.js";
import type { ServerContext } from "../context/index.js";
import type { PrismaType } from "@mailtura/database";
import type { TaskManager } from "../tasks/index.js";
import { hasPermission } from "@mailtura/rpcmodel/auth/index.js";
import { uuidv7 } from "@mailtura/rpcmodel/helpers/index.js";

interface SmtpSession extends SMTPServerSession {
  user?: any;
}

class Server {
  readonly #prisma: PrismaType;
  readonly #taskManager: TaskManager;
  readonly #server: SMTPServer;

  constructor(context: ServerContext) {
    this.#prisma = context.prisma;
    this.#taskManager = context.taskManager;

    this.#server = new SMTPServer({
      authOptional: false,
      onAuth: (auth, session: SmtpSession, callback) => {
        this.#validateAuth(auth, session, callback).catch(err => callback(err as Error));
      },
      onData: (stream, session: SmtpSession, callback) => {
        this.#handleData(stream, session, callback).catch(err => callback(err as Error));
      },
    });
  }

  async #validateAuth(
    auth: SMTPServerAuthentication,
    session: SmtpSession,
    callback: (err: Error | null | undefined, response?: SMTPServerAuthenticationResponse) => void
  ) {
    if (auth.username !== "apikey") {
      return callback(new Error("Invalid username, must be 'apikey'"));
    }

    const apiKey = this.#validatePassword(auth.password ?? "");
    if (!apiKey) {
      return callback(new Error("Invalid API key"));
    }
    session.user = apiKey;
    callback(null, { user: apiKey });
  }

  async #validatePassword(password: string) {
    const apiKeyEntity = await validateApiKey(this.#prisma, password);
    if (!apiKeyEntity) {
      throw new Error("Invalid API key");
    }
    if (!hasPermission("send::emails", apiKeyEntity)) {
      throw new Error("Invalid API key");
    }
    return apiKeyEntity;
  }

  async #handleData(stream: SMTPServerDataStream, session: SmtpSession, callback: (err?: Error | null) => void) {
    const parsed = await simpleParser(stream);
    const apiKey = session.user;
    const tenantId = apiKey.tenant_id;
  }
}

export async function startSmtpServer(context: ServerContext) {
  const { prisma, taskManager } = context;

  const server = new SMTPServer({
    authOptional: false,
    async onData(stream, session: SmtpSession, callback) {
      try {
        const parsed = await simpleParser(stream);
        const apiKey = session.user;
        const tenantId = apiKey.tenant_id;

        const subscriberListIds: string[] = [];
        const directRecipients: { name: string; email: string }[] = [];

        const processAddress = (addr: any) => {
          if (!addr || !addr.value) return;
          for (const element of addr.value) {
            const email = element.address;
            const name = element.name || "";
            const listMatch = email.match(/^list-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})@/i);
            if (listMatch) {
              subscriberListIds.push(listMatch[1]);
            } else {
              directRecipients.push({ name, email });
            }
          }
        };

        processAddress(parsed.to);
        processAddress(parsed.cc);
        processAddress(parsed.bcc);

        const senderEmail = parsed.from?.value[0]?.address || "unknown@mailtura.run";
        const senderName = parsed.from?.value[0]?.name || "Unknown";

        const mailConfig = await prisma.mail_configs.findFirst({
          where: { tenant_id: tenantId },
        });

        if (!mailConfig) {
          return callback(new Error(`No mail configuration found for tenant ${tenantId}`));
        }

        const mailSender = await prisma.mail_senders.findFirst({ where: { tenant_id: tenantId, email: senderEmail } });

        const mailSending = await prisma.mail_sendings.create({
          data: {
            id: uuidv7(),
            tenant_id: tenantId,
            subject: parsed.subject || "(No Subject)",
            content: parsed.html || parsed.text || "",
            text_content: parsed.text || null,
            content_type: "direct",
            is_template: false,
            substitutions: {},
            created_at: new Date(),
            created_by: `apikey:${apiKey.id}`,
            mail_sender: {
              connectOrCreate: {
                where: {
                  id: mailSender?.id || "00000000-0000-0000-0000-000000000000",
                },
                create: {
                  id: uuidv7(),
                  tenant_id: tenantId,
                  name: senderName,
                  email: senderEmail,
                  created_at: new Date(),
                  created_by: `apikey:${apiKey.id}`,
                },
              },
            },
            mail_config: {
              connect: {
                id: mailConfig.id,
              },
            },
            mail_receivers: {
              create: directRecipients.map(r => ({
                id: uuidv7(),
                tenant_id: tenantId,
                name: r.name,
                email: r.email,
                substitutions: {},
                created_at: new Date(),
                created_by: `apikey:${apiKey.id}`,
              })),
            },
            subscriber_lists: {
              create: subscriberListIds.map(id => ({
                subscriber_lists: {
                  connect: { id },
                },
              })),
            },
          },
        });

        await taskManager.createSendMailJob(tenantId, mailSending.id);

        callback();
      } catch (err: any) {
        callback(err);
      }
    },
  });

  const port = parseInt(process.env.SMTP_SERVER_PORT || "2525");
  server.listen(port, () => {
    console.info(`SMTP Server listening on port ${port}`);
  });
}
