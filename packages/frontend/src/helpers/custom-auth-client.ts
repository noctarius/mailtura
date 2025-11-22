import { createAuthClient } from "better-auth/solid";
import { magicLinkClient, passkeyClient, twoFactorClient } from "better-auth/client/plugins";
import { User } from "@mailtura/rpcmodel/lib/api/index.js";
import { joinPath } from "@mailtura/rpcmodel/lib/helpers/index.js";

const newAuthClient = (baseURL: string, basePath: string) => {
  return createAuthClient({
    baseURL: baseURL,
    basePath: basePath,
    plugins: [twoFactorClient(), passkeyClient(), magicLinkClient()],
  });
};

export class CustomAuthClient {
  readonly #baseUrl: string;
  readonly #authApiBasePath: string;
  readonly #client: ReturnType<typeof newAuthClient>;

  constructor(baseUrl: string, basePath: string) {
    this.#baseUrl = baseUrl;
    this.#authApiBasePath = joinPath(basePath, "/auth");
    this.#client = newAuthClient(baseUrl, this.#authApiBasePath);
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
    const url = joinPath(this.#baseUrl, this.#authApiBasePath, "/sign-up/email");
    const response = await fetch(url, {
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
