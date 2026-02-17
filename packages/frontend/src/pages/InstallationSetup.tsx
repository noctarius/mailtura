import { createMemo, createSignal, JSX } from "solid-js";
import { API_URL } from "../constants.js";
import { toast } from "solid-toast";

interface InstallationSetupProps {
  onInstalled: () => void;
}

type MailType = "smtp" | "sendgrid" | "mailgun" | "mailchimp" | "mailjet" | "ses";
type SmtpAuthType = "usernamePassword" | "clientOauth2" | "serviceOauth2";

const toNumber = (value: string, fallback: number) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const InstallationSetup = (props: InstallationSetupProps) => {
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");

  const [mailType, setMailType] = createSignal<MailType>("smtp");
  const [mailName, setMailName] = createSignal("System");

  const [smtpHost, setSmtpHost] = createSignal("");
  const [smtpPort, setSmtpPort] = createSignal("587");
  const [smtpSecure, setSmtpSecure] = createSignal(false);
  const [smtpMaxConnections, setSmtpMaxConnections] = createSignal("5");
  const [smtpMaxMessages, setSmtpMaxMessages] = createSignal("100");

  const [smtpAuthType, setSmtpAuthType] = createSignal<SmtpAuthType>("usernamePassword");
  const [smtpAuthUsername, setSmtpAuthUsername] = createSignal("");
  const [smtpAuthPassword, setSmtpAuthPassword] = createSignal("");
  const [smtpClientId, setSmtpClientId] = createSignal("");
  const [smtpClientSecret, setSmtpClientSecret] = createSignal("");
  const [smtpAccessToken, setSmtpAccessToken] = createSignal("");
  const [smtpRefreshToken, setSmtpRefreshToken] = createSignal("");
  const [smtpExpiresAt, setSmtpExpiresAt] = createSignal("0");
  const [smtpAccessUrl, setSmtpAccessUrl] = createSignal("");
  const [smtpServiceClient, setSmtpServiceClient] = createSignal("");
  const [smtpPrivateKeyId, setSmtpPrivateKeyId] = createSignal("");

  const [sendgridApiKey, setSendgridApiKey] = createSignal("");
  const [sendgridRegion, setSendgridRegion] = createSignal<"global" | "eu">("global");
  const [sendgridUsername, setSendgridUsername] = createSignal("");
  const [sendgridSubuser, setSendgridSubuser] = createSignal("");
  const [sendgridVerificationKey, setSendgridVerificationKey] = createSignal("");

  const [mailgunDomain, setMailgunDomain] = createSignal("");
  const [mailgunApiKey, setMailgunApiKey] = createSignal("");

  const [mailchimpApiKey, setMailchimpApiKey] = createSignal("");

  const [mailjetApiKey, setMailjetApiKey] = createSignal("");
  const [mailjetApiSecret, setMailjetApiSecret] = createSignal("");

  const [sesRegion, setSesRegion] = createSignal("");
  const [sesAccessKeyId, setSesAccessKeyId] = createSignal("");
  const [sesSecretAccessKey, setSesSecretAccessKey] = createSignal("");
  const [sesSessionToken, setSesSessionToken] = createSignal("");

  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal("");

  const systemMailConfig = createMemo(() => {
    if (mailType() === "smtp") {
      const authBase = {
        name: mailName(),
        type: smtpAuthType(),
        username: smtpAuthUsername(),
      };

      const auth =
        smtpAuthType() === "usernamePassword"
          ? {
              ...authBase,
              password: smtpAuthPassword(),
            }
          : smtpAuthType() === "clientOauth2"
            ? {
                ...authBase,
                clientId: smtpClientId(),
                clientSecret: smtpClientSecret(),
                expiresAt: toNumber(smtpExpiresAt(), 0),
                ...(smtpAccessToken() ? { accessToken: smtpAccessToken() } : {}),
                ...(smtpRefreshToken() ? { refreshToken: smtpRefreshToken() } : {}),
                ...(smtpAccessUrl() ? { accessUrl: smtpAccessUrl() } : {}),
              }
            : {
                ...authBase,
                serviceClient: smtpServiceClient(),
                privateKeyId: smtpPrivateKeyId(),
              };

      return {
        host: smtpHost(),
        port: toNumber(smtpPort(), 587),
        secure: smtpSecure(),
        maxConnections: toNumber(smtpMaxConnections(), 1),
        maxMessages: toNumber(smtpMaxMessages(), 1),
        auth,
      };
    }

    if (mailType() === "sendgrid") {
      return {
        apiKey: sendgridApiKey(),
        region: sendgridRegion(),
        verificationKey: sendgridVerificationKey(),
        ...(sendgridUsername() ? { username: sendgridUsername() } : {}),
        ...(sendgridSubuser() ? { subuser: sendgridSubuser() } : {}),
      };
    }

    if (mailType() === "mailgun") {
      return {
        domain: mailgunDomain(),
        apiKey: mailgunApiKey(),
      };
    }

    if (mailType() === "mailchimp") {
      return {
        apiKey: mailchimpApiKey(),
      };
    }

    if (mailType() === "mailjet") {
      return {
        apiKey: mailjetApiKey(),
        apiSecret: mailjetApiSecret(),
      };
    }

    return {
      region: sesRegion(),
      accessKeyId: sesAccessKeyId(),
      secretAccessKey: sesSecretAccessKey(),
      ...(sesSessionToken() ? { sessionToken: sesSessionToken() } : {}),
    };
  });

  const onSubmit: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent> = async event => {
    event.preventDefault();
    setError("");

    if (password() !== confirmPassword()) {
      setError("Passwords do not match.");
      return;
    }

    if (password().length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(new URL("api/v1/install", API_URL), {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user: {
            firstName: firstName(),
            lastName: lastName(),
            email: email(),
            password: password(),
          },
          systemMail: {
            name: mailName() || "System",
            type: mailType(),
            config: systemMailConfig(),
          },
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        setError(payload?.message ?? "Installation failed. Please verify your settings.");
        return;
      }

      toast.success("Installation finished. Please sign in.");
      props.onInstalled();
    } catch {
      setError("Installation failed. Please verify your settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 sm:p-8">
      <div class="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
        <div class="px-8 py-6 border-b border-slate-200 bg-slate-50">
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Initial Installation</h1>
          <p class="mt-2 text-slate-600">
            Complete the first-time setup to create the admin account and system mail provider.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          class="p-8 space-y-8"
        >
          {error() && (
            <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error()}</div>
          )}

          <section class="space-y-4">
            <h2 class="text-lg font-semibold text-slate-900">Administrator Account</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                value={firstName()}
                onInput={event => setFirstName(event.currentTarget.value)}
                class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName()}
                onInput={event => setLastName(event.currentTarget.value)}
                class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email address"
                value={email()}
                onInput={event => setEmail(event.currentTarget.value)}
                class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password (min 8 chars)"
                value={password()}
                onInput={event => setPassword(event.currentTarget.value)}
                class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword()}
              onInput={event => setConfirmPassword(event.currentTarget.value)}
              class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </section>

          <section class="space-y-4">
            <h2 class="text-lg font-semibold text-slate-900">System Mail Configuration</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Configuration name"
                value={mailName()}
                onInput={event => setMailName(event.currentTarget.value)}
                class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={mailType()}
                onChange={event => setMailType(event.currentTarget.value as MailType)}
                class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="smtp">SMTP</option>
                <option value="sendgrid">SendGrid</option>
                <option value="mailgun">Mailgun</option>
                <option value="mailchimp">Mailchimp</option>
                <option value="mailjet">Mailjet</option>
                <option value="ses">Amazon SES</option>
              </select>
            </div>

            {mailType() === "smtp" && (
              <div class="space-y-4 rounded-xl border border-slate-200 p-4 bg-slate-50">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="SMTP host"
                    value={smtpHost()}
                    onInput={event => setSmtpHost(event.currentTarget.value)}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    max="65535"
                    placeholder="Port"
                    value={smtpPort()}
                    onInput={event => setSmtpPort(event.currentTarget.value)}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <label class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700">
                    <input
                      type="checkbox"
                      checked={smtpSecure()}
                      onChange={event => setSmtpSecure(event.currentTarget.checked)}
                    />
                    Use TLS (secure)
                  </label>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="number"
                    min="1"
                    placeholder="Max connections"
                    value={smtpMaxConnections()}
                    onInput={event => setSmtpMaxConnections(event.currentTarget.value)}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Max messages"
                    value={smtpMaxMessages()}
                    onInput={event => setSmtpMaxMessages(event.currentTarget.value)}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <select
                  value={smtpAuthType()}
                  onChange={event => setSmtpAuthType(event.currentTarget.value as SmtpAuthType)}
                  class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="usernamePassword">Username + Password</option>
                  <option value="clientOauth2">Client OAuth2</option>
                  <option value="serviceOauth2">Service OAuth2</option>
                </select>

                <input
                  type="text"
                  placeholder="SMTP username"
                  value={smtpAuthUsername()}
                  onInput={event => setSmtpAuthUsername(event.currentTarget.value)}
                  class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                {smtpAuthType() === "usernamePassword" && (
                  <input
                    type="password"
                    placeholder="SMTP password"
                    value={smtpAuthPassword()}
                    onInput={event => setSmtpAuthPassword(event.currentTarget.value)}
                    class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )}

                {smtpAuthType() === "clientOauth2" && (
                  <>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="OAuth client ID"
                        value={smtpClientId()}
                        onInput={event => setSmtpClientId(event.currentTarget.value)}
                        class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="password"
                        placeholder="OAuth client secret"
                        value={smtpClientSecret()}
                        onInput={event => setSmtpClientSecret(event.currentTarget.value)}
                        class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="number"
                        min="0"
                        placeholder="Token expiry (unix seconds)"
                        value={smtpExpiresAt()}
                        onInput={event => setSmtpExpiresAt(event.currentTarget.value)}
                        class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Access URL (optional)"
                        value={smtpAccessUrl()}
                        onInput={event => setSmtpAccessUrl(event.currentTarget.value)}
                        class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Access token (optional)"
                        value={smtpAccessToken()}
                        onInput={event => setSmtpAccessToken(event.currentTarget.value)}
                        class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Refresh token (optional)"
                        value={smtpRefreshToken()}
                        onInput={event => setSmtpRefreshToken(event.currentTarget.value)}
                        class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}

                {smtpAuthType() === "serviceOauth2" && (
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Service client"
                      value={smtpServiceClient()}
                      onInput={event => setSmtpServiceClient(event.currentTarget.value)}
                      class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Private key ID"
                      value={smtpPrivateKeyId()}
                      onInput={event => setSmtpPrivateKeyId(event.currentTarget.value)}
                      class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </div>
            )}

            {mailType() === "sendgrid" && (
              <div class="space-y-4 rounded-xl border border-slate-200 p-4 bg-slate-50">
                <input
                  type="password"
                  placeholder="SendGrid API key"
                  value={sendgridApiKey()}
                  onInput={event => setSendgridApiKey(event.currentTarget.value)}
                  class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={sendgridRegion()}
                    onChange={event => setSendgridRegion(event.currentTarget.value as "global" | "eu")}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="global">Global</option>
                    <option value="eu">EU</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Webhook verification key"
                    value={sendgridVerificationKey()}
                    onInput={event => setSendgridVerificationKey(event.currentTarget.value)}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Username (optional)"
                    value={sendgridUsername()}
                    onInput={event => setSendgridUsername(event.currentTarget.value)}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Subuser (optional)"
                    value={sendgridSubuser()}
                    onInput={event => setSendgridSubuser(event.currentTarget.value)}
                    class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {mailType() === "mailgun" && (
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50">
                <input
                  type="text"
                  placeholder="Mailgun domain"
                  value={mailgunDomain()}
                  onInput={event => setMailgunDomain(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Mailgun API key"
                  value={mailgunApiKey()}
                  onInput={event => setMailgunApiKey(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {mailType() === "mailchimp" && (
              <div class="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <input
                  type="password"
                  placeholder="Mailchimp API key"
                  value={mailchimpApiKey()}
                  onInput={event => setMailchimpApiKey(event.currentTarget.value)}
                  class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {mailType() === "mailjet" && (
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50">
                <input
                  type="text"
                  placeholder="Mailjet API key"
                  value={mailjetApiKey()}
                  onInput={event => setMailjetApiKey(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Mailjet API secret"
                  value={mailjetApiSecret()}
                  onInput={event => setMailjetApiSecret(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {mailType() === "ses" && (
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50">
                <input
                  type="text"
                  placeholder="AWS region"
                  value={sesRegion()}
                  onInput={event => setSesRegion(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="AWS access key ID"
                  value={sesAccessKeyId()}
                  onInput={event => setSesAccessKeyId(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="AWS secret access key"
                  value={sesSecretAccessKey()}
                  onInput={event => setSesSecretAccessKey(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Session token (optional)"
                  value={sesSessionToken()}
                  onInput={event => setSesSessionToken(event.currentTarget.value)}
                  class="rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </section>

          <div class="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting()}
              class="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting() ? "Installing..." : "Complete Installation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstallationSetup;
