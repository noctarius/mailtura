import { createAuthClient } from "better-auth/solid";
import { magicLinkClient, passkeyClient, twoFactorClient } from "better-auth/client/plugins";
import { User } from "@mailtura/rpcmodel/lib/models/index.js";

const newAuthClient = (baseURL: string, basePath: string) => {
  return createAuthClient({
    baseURL: baseURL,
    basePath: basePath,
    plugins: [twoFactorClient(), passkeyClient(), magicLinkClient()],
  });
};

const joinPath = (a: string, b: string) => {
  if (a.endsWith("/")) a = a.substring(0, a.length - 1);
  if (b.startsWith("/")) b = b.substring(1);
  return `${a}/${b}`;
};

export class CustomAuthClient {
  readonly #apiBasePath: string;
  readonly #authApiBasePath: string;
  readonly #client: ReturnType<typeof newAuthClient>;

  constructor(baseURL: string, basePath: string) {
    this.#apiBasePath = basePath;
    this.#authApiBasePath = joinPath(this.#apiBasePath, "/auth");
    this.#client = newAuthClient(baseURL, this.#authApiBasePath);
  }

  async signIn(email: string, password: string): Promise<void> {
    const response = await this.#client.signIn.email({ email, password });
    if (response.error) {
      throw new Error(response.error.message);
    }
  }

  async signOut(callbackPath: string): Promise<void> {
    await this.#client.signOut({
      fetchOptions: {
        onSuccess() {
          window.location.assign(callbackPath);
        },
      },
    });
  }

  async getSession() {
    return this.#client.getSession();
  }

  async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    callbackURL?: string
  ): Promise<User> {
    const response = await fetch(`${this.#authApiBasePath}/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password, callbackURL }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }
}
