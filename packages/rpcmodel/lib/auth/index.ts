import { type Static, Type } from "typebox";

export const SignInEmail = Type.Object(
  {
    email: Type.String({ format: "email" }),
    password: Type.String(),
    callbackURL: Type.Optional(Type.String({ format: "uri" })),
    rememberMe: Type.Optional(Type.Boolean({ default: true })),
  },
  {
    $id: "SignInEmail",
    description: "Sign in with email",
  }
);

export type SignInEmail = Static<typeof SignInEmail>;

export const SignInEmailResponse = Type.Object(
  {
    redirect: Type.Boolean(),
    token: Type.String(),
    url: Type.Null(),
    user: Type.Ref("AuthUser"),
  },
  {
    $id: "SignInEmailResponse",
    description: "Sign in with email response",
  }
);

export type SignInEmailResponse = Static<typeof SignInEmailResponse>;

export const SignInSocial = Type.Object(
  {
    provider: Type.Unknown(),
    callbackURL: Type.Optional(Type.String({ format: "uri" })),
    newUserCallbackURL: Type.Optional(Type.String({ format: "uri" })),
    errorCallbackURL: Type.Optional(Type.String({ format: "uri" })),
    disableRedirect: Type.Optional(Type.Boolean({ default: false })),
    idToken: Type.Optional(
      Type.Object({
        token: Type.String(),
        nonce: Type.Optional(Type.String()),
        accessToken: Type.Optional(Type.String()),
        refreshToken: Type.Optional(Type.String()),
        expiresAt: Type.Optional(Type.String({ format: "date-time" })),
      })
    ),
    scopes: Type.Optional(Type.Array(Type.String())),
    requestSignUp: Type.Optional(Type.Boolean({ default: false })),
    loginHint: Type.Optional(Type.String()),
  },
  {
    $id: "SignInSocial",
    description: "Sign in with social",
  }
);

export type SignInSocial = Static<typeof SignInSocial>;

export const SignInSocialResponse = Type.Union(
  [
    Type.Object({
      redirect: Type.Boolean(),
      token: Type.String(),
      user: Type.Ref("AuthUser"),
    }),
    Type.Object({
      url: Type.String({ format: "uri" }),
      redirect: Type.Boolean(),
    }),
  ],
  {
    $id: "SignInSocialResponse",
    description: "Sign in with social response",
  }
);

export const SignUpEmail = Type.Object(
  {
    name: Type.Optional(Type.String()),
    email: Type.String({ format: "email" }),
    password: Type.String(),
    image: Type.Optional(Type.String()),
    callbackURL: Type.Optional(Type.String({ format: "uri" })),
    rememberMe: Type.Optional(Type.Boolean({ default: true })),
  },
  {
    $id: "SignUpEmail",
    description: "Sign up with email",
  }
);

export type SignUpEmail = Static<typeof SignUpEmail>;

export const SignUpEmailResponse = Type.Object(
  {
    token: Type.Optional(Type.String()),
    user: Type.Ref("AuthUser"),
  },
  {
    $id: "SignUpEmailResponse",
    description: "Sign up with email response",
  }
);

export type SignUpEmailResponse = Static<typeof SignUpEmailResponse>;

export const GetSessionResponse = Type.Object(
  {
    user: Type.Ref("AuthUser"),
    session: Type.Ref("AuthSession"),
  },
  {
    $id: "GetSessionResponse",
    description: "Get session response",
  }
);

export type GetSessionResponse = Static<typeof GetSessionResponse>;

export const VerifyEmailResponse = Type.Union(
  [
    Type.Object({
      status: Type.Boolean(),
      user: Type.Ref("AuthUser"),
    }),
    Type.Object({
      status: Type.Boolean(),
    }),
  ],
  {
    $id: "VerifyEmailResponse",
    description: "Verify email response",
  }
);

export type VerifyEmailResponse = Static<typeof VerifyEmailResponse>;

export const PasswordResetResponse = Type.Object(
  {
    status: Type.Boolean(),
    message: Type.String(),
  },
  {
    $id: "PasswordResetResponse",
    description: "Password reset response",
  }
);

export type PasswordResetResponse = Static<typeof PasswordResetResponse>;

export const AuthUser = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    email: Type.String({ format: "email" }),
    name: Type.Optional(Type.String()),
    image: Type.Optional(Type.String()),
    emailVerified: Type.Boolean(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  {
    $id: "AuthUser",
    description: "User object",
  }
);

export type AuthUser = Static<typeof AuthUser>;

export const AuthSession = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
    userId: Type.String({ format: "uuid" }),
    expiresAt: Type.String({ format: "date-time" }),
    token: Type.String(),
    ipAddress: Type.Optional(Type.String()),
    userAgent: Type.Optional(Type.String()),
  },
  {
    $id: "AuthSession",
    description: "Session object",
  }
);

export type AuthSession = Static<typeof AuthSession>;
