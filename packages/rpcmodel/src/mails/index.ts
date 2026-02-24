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

export const SmtpAuth = Type.Intersect(
  [
    Type.Object({ type: Type.Enum(["usernamePassword", "clientOauth2", "serviceOauth2"]) }),
    Type.Union([UsernamePasswordSmtpAuth, ClientOauth2SmtpAuth, ServiceOauth2SmtpAuth]),
  ],
  {
    $id: "SmtpAuth",
    description: "SMTP authentication",
    type: "object",
    additionalProperties: false,
  }
);

export type SmtpAuth = Static<typeof SmtpAuth>;

export const SmtpConfig = Type.Object(
  {
    host: Type.String(),
    port: Type.Integer({ minimum: 1, maximum: 65535 }),
    secure: Type.Boolean(),
    maxConnections: Type.Integer({ minimum: 1 }),
    maxMessages: Type.Integer({ minimum: 1 }),
    auth: SmtpAuth,
  },
  {
    $id: "SmtpConfig",
    description: "SMTP configuration",
    additionalProperties: false,
  }
);

export type SmtpConfig = Static<typeof SmtpConfig>;

export const SendgridConfig = Type.Object(
  {
    apiKey: Type.String(),
    region: Type.Optional(Type.Union([Type.Literal("global"), Type.Literal("eu")])),
    username: Type.Optional(Type.String()),
    subuser: Type.Optional(Type.String()),
    verificationKey: Type.String(),
  },
  {
    $id: "SendgridConfig",
    description: "Sendgrid configuration",
    additionalProperties: false,
  }
);

export type SendgridConfig = Static<typeof SendgridConfig>;

export const MailgunConfig = Type.Object(
  {
    domain: Type.String(),
    apiKey: Type.String(),
  },
  {
    $id: "MailgunConfig",
    description: "Mailgun configuration",
    additionalProperties: false,
  }
);

export type MailgunConfig = Static<typeof MailgunConfig>;

export const MailchimpConfig = Type.Object(
  {
    apiKey: Type.String(),
  },
  {
    $id: "MailchimpConfig",
    description: "Mailchimp configuration",
    additionalProperties: false,
  }
);

export type MailchimpConfig = Static<typeof MailchimpConfig>;

export const MailjetConfig = Type.Object(
  {
    apiKey: Type.String(),
    apiSecret: Type.String(),
  },
  {
    $id: "MailjetConfig",
    description: "Mailjet configuration",
    additionalProperties: false,
  }
);

export type MailjetConfig = Static<typeof MailjetConfig>;

export const SesConfig = Type.Object(
  {
    region: Type.String(),
    accessKeyId: Type.String(),
    secretAccessKey: Type.String(),
    sessionToken: Type.Optional(Type.String()),
  },
  {
    $id: "SesConfig",
    description: "Amazon SES configuration",
    additionalProperties: false,
  }
);

export type SesConfig = Static<typeof SesConfig>;

export const MailConfig = Type.Intersect(
  [
    Type.Object({
      id: Type.String({ format: "uuid" }),
      tenant_id: Type.Optional(Type.String({ format: "uuid" })),
      name: Type.String(),
      type: Type.Enum(["smtp", "sendgrid", "mailgun", "mailchimp", "mailjet", "ses"]),
      createdAt: Type.Optional(Type.String({ format: "date-time" })),
      createdBy: Type.Optional(Type.String()),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    }),
    Type.Union([SmtpConfig, SendgridConfig, MailgunConfig, MailchimpConfig, MailjetConfig, SesConfig]),
  ],
  {
    $id: "MailConfig",
    description: "Mail configuration",
    type: "object",
    additionalProperties: false,
  }
);

export type MailConfig = Static<typeof MailConfig>;

export const ReferenceMailContact = Type.Object(
  {
    contactId: Type.String({ format: "uuid" }),
  },
  {
    $id: "ReferenceMailContact",
    description: "Reference to a mail contact",
  }
);

export type ReferenceMailContact = Static<typeof ReferenceMailContact>;

export const DirectMailContact = Type.Object(
  {
    email: Type.String(),
    name: Type.Optional(Type.String()),
  },
  {
    $id: "DirectMailContact",
    description: "Direct mail contact",
  }
);

export type DirectMailContact = Static<typeof DirectMailContact>;

export const MailContact = Type.Union([ReferenceMailContact, DirectMailContact]);

export type MailContact = Static<typeof MailContact>;

export const MailDirectContent = Type.Object(
  {
    content: Type.String(),
    textContent: Type.Optional(Type.String()),
    isTemplate: Type.Optional(Type.Boolean()),
    substitutions: Type.Optional(Type.Record(Type.String(), Type.Any())),
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

export const MailContent = Type.Union(
  [
    Type.Object(
      {
        type: Type.Literal("direct"),
        content: Type.String(),
        textContent: Type.Optional(Type.String()),
        isTemplate: Type.Optional(Type.Boolean()),
        substitutions: Type.Optional(Type.Record(Type.String(), Type.Any())),
      },
      { additionalProperties: false }
    ),
    Type.Object(
      {
        type: Type.Literal("template"),
        templateId: Type.String(),
      },
      { additionalProperties: false }
    ),
  ],
  {
    $id: "MailContent",
    description: "Mail content",
    type: "object",
  }
);

export type MailContent = Static<typeof MailContent>;

export const MailRecipient = Type.Object(
  {
    to: MailContact,
    cc: Type.Optional(Type.Union([MailContact, Type.Array(MailContact)])),
    bcc: Type.Optional(Type.Union([MailContact, Type.Array(MailContact)])),
    replyTo: Type.Optional(MailContact),
    substitutions: Type.Optional(Type.Record(Type.String(), Type.Any())),
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
    substitutions: Type.Optional(Type.Record(Type.String(), Type.Any())),
    features: Type.Object({
      embedImages: Type.Optional(Type.Boolean()),
      trackOpens: Type.Optional(Type.Boolean()),
      trackClicks: Type.Optional(Type.Boolean()),
      minifyCss: Type.Optional(Type.Boolean()),
      minifyHtml: Type.Optional(Type.Boolean()),
      minifySvg: Type.Optional(Type.Boolean()),
    }),
  },
  {
    $id: "Mail",
    description: "Mail",
    additionalProperties: false,
  }
);

export type Mail = Static<typeof Mail>;
