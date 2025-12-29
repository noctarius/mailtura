import { type PrismaType, type UserEntity } from "@mailtura/database";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { createEmailVerificationToken } from "better-auth/api";
import { getBaseConfig } from "../system/index.js";
import { getBaseSystemUrl } from "../helpers/base-system-url.js";
import type { TaskManager } from "../tasks/index.js";

const authSecret = process.env.MAILTURA_AUTH_SECRET;
if (!authSecret) {
  throw new Error("MAILTURA_AUTH_SECRET environment variable not set");
}

const getSystemMailConfig = async (prisma: PrismaType) => {
  const baseConfig = await getBaseConfig(prisma);
  if (!baseConfig) throw new Error("Base config not found");

  return await prisma.mail_configs.findFirstOrThrow({
    where: {
      tenant_id: baseConfig.systemTenantId,
      name: "default",
    },
  });
};

export async function sendSystemMail(
  prisma: PrismaType,
  taskManager: TaskManager,
  email: string,
  name: string,
  subject: string,
  content: string,
  textContent?: string,
  substitutions?: Record<string, string>
) {
  const systemMailConfig = await getSystemMailConfig(prisma);
  const mailSending = await prisma.mail_sendings.create({
    data: {
      tenant_id: systemMailConfig.tenant_id,
      mail_config_id: systemMailConfig.id,
      mail_sender_id: "019b1152-e76e-7a86-8582-28f0e3204c6d",
      subject,
      content,
      text_content: textContent,
      content_type: "direct",
      is_template: true,
      substitutions: substitutions ?? {},
      created_at: UTC.now().toDate(),
      created_by: "api",

      mail_receivers: {
        create: [
          {
            tenant_id: systemMailConfig.tenant_id,
            email,
            name,
            substitutions: {},
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        ],
      },
    },
  });
  await taskManager.createSendMailJob(mailSending.tenant_id, mailSending.id);
}

export async function sendInviteEmail(
  prisma: PrismaType,
  taskManager: TaskManager,
  newUser: UserEntity,
  callbackUrl?: string
) {
  const name = newUser.first_name ?? newUser.email;
  const token = await createEmailVerificationToken(authSecret!, newUser.email);

  if (!callbackUrl) callbackUrl = "/";
  callbackUrl = encodeURIComponent(callbackUrl);

  const baseUrl = getBaseSystemUrl(prisma);
  const url = `${baseUrl}/auth/verify-email?token=${token}&callbackURL=${callbackUrl}`;

  const subject = "Welcome to Mailtura!";
  const content =
    '<mjml><mj-body><mj-section><mj-column><mj-text>Welcome to Mailtura! Your account has been created. Please click the link below to activate your account. <a href="{{url}}">{{url}}</a></mj-text></mj-column></mj-section></mj-body></mjml>';
  const textContent = `Welcome to Mailtura! Your account has been created. Please click the link below to activate your account. ${url}`;

  return sendSystemMail(prisma, taskManager, newUser.email, name, subject, content, textContent, { url: url });
}

export async function sendVerificationEmail(
  prisma: PrismaType,
  taskManager: TaskManager,
  email: string,
  token: string
) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("User not found");

  const baseUrl = getBaseSystemUrl(prisma);
  const url = `${baseUrl}/auth/verify-email?token=${token}`;

  const subject = "Welcome to Mailtura!";
  const content =
    '<mjml><mj-body><mj-section><mj-column><mj-text>Welcome to Mailtura! Your account has been created. Please click the link below to activate your account. <a href="{{url}}">{{url}}</a></mj-text></mj-column></mj-section></mj-body></mjml>';
  const textContent = `Welcome to Mailtura! Your account has been created. Please click the link below to activate your account. ${url}`;

  const name = user.first_name ?? email;
  return sendSystemMail(prisma, taskManager, email, name, subject, content, textContent, { url: url });
}

export async function sendMagicLinkEmail(prisma: PrismaType, taskManager: TaskManager, email: string, token: string) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("User not found");

  const baseUrl = getBaseSystemUrl(prisma);
  const url = `${baseUrl}/auth/magic-link?token=${token}`;

  const subject = "Login to Mailtura!";
  const content =
    '<mjml><mj-body><mj-section><mj-column><mj-text>Welcome to Mailtura! Please click the following link to login: <a href="{{url}}">{{url}}</a></mj-text></mj-column></mj-section></mj-body></mjml>';
  const textContent = `Welcome to Mailtura! Please click the following link to login: ${url}`;

  const name = user.first_name ?? email;
  return sendSystemMail(prisma, taskManager, email, name, subject, content, textContent, { url: url });
}

export async function sendResetPasswordEmail(
  prisma: PrismaType,
  taskManager: TaskManager,
  email: string,
  token: string
) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("User not found");

  const baseUrl = getBaseSystemUrl(prisma);
  const url = `${baseUrl}/auth/verify-email?token=${token}`;

  const subject = "Welcome to Mailtura!";
  const content =
    '<mjml><mj-body><mj-section><mj-column><mj-text>Welcome to Mailtura! Your account has been created. Please click the link below to activate your account. <a href="{{url}}">{{url}}</a></mj-text></mj-column></mj-section></mj-body></mjml>';
  const textContent = `Welcome to Mailtura! Your account has been created. Please click the link below to activate your account. ${url}`;

  const name = user.first_name ?? email;
  return sendSystemMail(prisma, taskManager, email, name, subject, content, textContent, { url: url });
}
