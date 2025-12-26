import { type Static, Type } from "typebox";

export function isUsernamePasswordAuth(
  config: SmtpAuth
): config is UsernamePasswordSmtpAuth & { type: "usernamePassword" } {
  return config.type === "usernamePassword";
}

export function isClientOauth2Auth(config: SmtpAuth): config is ClientOauth2SmtpAuth & { type: "clientOauth2" } {
  return config.type === "clientOauth2";
}

export function isServiceOauth2Auth(config: SmtpAuth): config is ServiceOauth2SmtpAuth & { type: "serviceOauth2" } {
  return config.type === "serviceOauth2";
}

export function isDirectContent(content: MailContent): content is MailDirectContent & { type: "direct" } {
  return content.type === "direct";
}

export function isTemplatedContent(content: MailContent): content is MailTemplatedContent & { type: "template" } {
  return content.type === "template";
}

export const UsernamePasswordSmtpAuth = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

export type UsernamePasswordSmtpAuth = Static<typeof UsernamePasswordSmtpAuth>;

export const ClientOauth2SmtpAuth = Type.Object({
  username: Type.String(),
  clientId: Type.String(),
  clientSecret: Type.String(),
  accessToken: Type.Optional(Type.String()),
  refreshToken: Type.Optional(Type.String()),
  expiresAt: Type.Integer({ minimum: 0 }),
  accessUrl: Type.Optional(Type.String()),
});

export type ClientOauth2SmtpAuth = Static<typeof ClientOauth2SmtpAuth>;

export const ServiceOauth2SmtpAuth = Type.Object({
  username: Type.String(),
  serviceClient: Type.String(),
  privateKeyId: Type.String(),
});

export type ServiceOauth2SmtpAuth = Static<typeof ServiceOauth2SmtpAuth>;

export const SmtpAuth = Type.Intersect([
  Type.Object({ type: Type.Enum(["usernamePassword", "clientOauth2", "serviceOauth2"]) }),
  Type.Union([UsernamePasswordSmtpAuth, ClientOauth2SmtpAuth, ServiceOauth2SmtpAuth]),
]);

export type SmtpAuth = Static<typeof SmtpAuth>;

export const SmtpConfig = Type.Object({
  host: Type.String(),
  port: Type.Integer({ minimum: 1, maximum: 65535 }),
  secure: Type.Boolean(),
  maxConnections: Type.Integer({ minimum: 1 }),
  maxMessages: Type.Integer({ minimum: 1 }),
  auth: SmtpAuth,
});

export type SmtpConfig = Static<typeof SmtpConfig>;

export const SendgridConfig = Type.Object({
  apiKey: Type.String(),
  region: Type.Optional(Type.Union([Type.Literal("global"), Type.Literal("eu")])),
  username: Type.Optional(Type.String()),
  subuser: Type.Optional(Type.String()),
  verificationKey: Type.String(),
});

export type SendgridConfig = Static<typeof SendgridConfig>;

export const MailgunConfig = Type.Object({
  domain: Type.String(),
  apiKey: Type.String(),
});

export type MailgunConfig = Static<typeof MailgunConfig>;

export const MailchimpConfig = Type.Object({
  apiKey: Type.String(),
});

export type MailchimpConfig = Static<typeof MailchimpConfig>;

export const MailjetConfig = Type.Object({
  apiKey: Type.String(),
  apiSecret: Type.String(),
});

export type MailjetConfig = Static<typeof MailjetConfig>;

export const MailConfig = Type.Intersect([
  Type.Object({
    name: Type.String(),
    type: Type.Enum(["smtp", "sendgrid", "mailgun", "mailchimp", "mailjet"]),
  }),
  Type.Union([SmtpConfig, SendgridConfig, MailgunConfig, MailchimpConfig, MailjetConfig]),
]);

export type MailConfig = Static<typeof MailConfig>;

export const MailContact = Type.Object({
  email: Type.String(),
  name: Type.Optional(Type.String()),
});

export type MailContact = Static<typeof MailContact>;

export const MailDirectContent = Type.Object(
  {
    content: Type.String(),
    textContent: Type.Optional(Type.String()),
    isTemplate: Type.Optional(Type.Boolean()),
    substitutions: Type.Optional(Type.Record(Type.String(), Type.String())),
  },
  {
    $id: "MailDirectContent",
    description: "Direct mail content",
    additionalProperties: false,
  }
);

export type MailDirectContent = Static<typeof MailDirectContent>;

export const MailTemplatedContent = Type.Object(
  {
    templateId: Type.String(),
  },
  {
    $id: "MailTemplatedContent",
    description: "Templated mail content",
    additionalProperties: false,
  }
);

export type MailTemplatedContent = Static<typeof MailTemplatedContent>;

export const MailContent = Type.Intersect(
  [Type.Object({ type: Type.Enum(["direct", "template"]) }), Type.Union([MailDirectContent, MailTemplatedContent])],
  {
    $id: "MailContent",
    description: "Mail content",
  }
);

export type MailContent = Static<typeof MailContent>;

export const MailRecipient = Type.Object(
  {
    to: Type.Union([MailContact, Type.Array(MailContact)]),
    cc: Type.Optional(Type.Union([MailContact, Type.Array(MailContact)])),
    bcc: Type.Optional(Type.Union([MailContact, Type.Array(MailContact)])),
    replyTo: Type.Optional(MailContact),
    substitutions: Type.Optional(Type.Record(Type.String(), Type.String())),
  },
  {
    $id: "MailRecipient",
    description: "Mail recipient",
    additionalProperties: false,
  }
);

export type MailRecipient = Static<typeof MailRecipient>;

export const Mail = Type.Object(
  {
    from: MailContact,
    subject: Type.String(),
    content: MailContent,
    recipients: Type.Array(MailRecipient),
    substitutions: Type.Optional(Type.Record(Type.String(), Type.String())),
    features: Type.Object({
      trackOpens: Type.Optional(Type.Boolean()),
      trackClicks: Type.Optional(Type.Boolean()),
    }),
  },
  {
    $id: "Mail",
    description: "Mail",
    additionalProperties: false,
  }
);

export type Mail = Static<typeof Mail>;
