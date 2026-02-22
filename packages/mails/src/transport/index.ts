import {
  createTemplateCompiler,
  type ResolvedTemplate,
  type TemplateCompiler,
  type TemplateCompilerConfig,
  type TemplateResolver,
} from "@mailtura/contentcompiler";
import { type Mail, type MailContact, type MailRecipient } from "@mailtura/rpcmodel/mails/index.js";

export type UrlProxy = ResolvedTemplate["urlRelocations"][number];
export type RecipientType = "to" | "cc" | "bcc";
export type RecipientGroupingPolicy = "auto" | "joined" | "per-recipient";

export interface DeliveryPlan<EmailType> {
  to: EmailType[];
  cc: EmailType[];
  bcc: EmailType[];
  contactIds: Array<string | undefined>;
  html: string;
  text: string;
  recipientCount: number;
}

export interface DeliverySendResult {
  providerMailId?: string;
}

export interface MailLogEntry {
  contactId?: string;
  providerId: string;
  providerMailId?: string;
}

export interface TransportConfig {
  apiBase: string;
  templateResolver: TemplateResolver;
  urlRelocationStorage: (urlRelocations: UrlProxy[]) => Promise<void>;
  mailLogStorage: (entries: MailLogEntry[]) => Promise<void>;
}

export interface Transport {
  send(mail: Mail): Promise<number>;
}

export abstract class AbstractTransport<EmailType> implements Transport {
  readonly #transportConfig: TransportConfig;
  readonly #contentCompiler: TemplateCompiler;

  protected constructor(transportConfig: TransportConfig) {
    this.#transportConfig = transportConfig;
    this.#contentCompiler = createTemplateCompiler(transportConfig.templateResolver, transportConfig.apiBase);
  }

  abstract send(mail: Mail): Promise<number>;

  protected mergeSubstitutions(
    mailSubstitutions?: Record<string, string>,
    recipientSubstitutions?: Record<string, string>
  ): Record<string, string> {
    return {
      ...(mailSubstitutions ?? {}),
      ...(recipientSubstitutions ?? {}),
    };
  }

  protected async resolveTemplate<T extends Record<string, any> = any>(
    mail: Mail,
    substitutions?: T,
    bypassCache?: boolean
  ): Promise<Omit<ResolvedTemplate, "urlRelocations">> {
    const content = mail.content;
    const safeSubstitutions = substitutions ?? mail.substitutions ?? {};
    const features: TemplateCompilerConfig = {
      ...{
        embedImages: true,
        trackOpens: false,
        trackClicks: false,
        minifyHtml: true,
        minifyCss: true,
        minifySvg: true,
        bypassCache: bypassCache ?? false,
      },
      ...(mail.features ?? {}),
    };
    const resolvedTemplate = await this.#contentCompiler.resolveTemplate(content, safeSubstitutions, features);
    if (resolvedTemplate.errors) {
      return {
        errors: resolvedTemplate.errors,
        html: "",
        text: "",
      };
    }

    await this.#transportConfig.urlRelocationStorage(resolvedTemplate.urlRelocations ?? []);
    return {
      html: resolvedTemplate.html,
      text: resolvedTemplate.text,
    };
  }

  protected hasSubstitutions(mail: Mail): boolean {
    return mail.recipients.some(
      recipient => recipient.substitutions && Object.keys(recipient.substitutions).length > 0
    );
  }

  protected recipientGroupingPolicy(_mail: Mail): RecipientGroupingPolicy {
    return "per-recipient";
  }

  protected resolveRecipientGroupingPolicy(mail: Mail): Exclude<RecipientGroupingPolicy, "auto"> {
    const policy = this.recipientGroupingPolicy(mail);
    if (policy !== "auto") return policy;
    return this.hasSubstitutions(mail) ? "per-recipient" : "joined";
  }

  protected normalizeRecipients(contacts?: MailContact | MailContact[]): MailContact[] {
    if (!contacts) return [];
    return Array.isArray(contacts) ? contacts : [contacts];
  }

  protected mapMailAddresses(contacts?: MailContact | MailContact[], type?: RecipientType): EmailType[] {
    return this.normalizeRecipients(contacts).map(contact => this.mapMailAddress(contact, type));
  }

  protected mapRecipientAddresses(recipient: MailRecipient): Pick<DeliveryPlan<EmailType>, "to" | "cc" | "bcc"> {
    return {
      to: this.mapMailAddresses(recipient.to, "to"),
      cc: this.mapMailAddresses(recipient.cc, "cc"),
      bcc: this.mapMailAddresses(recipient.bcc, "bcc"),
    };
  }

  protected extractRecipientContactId(recipient: MailRecipient): string | undefined {
    const substitutions = recipient.substitutions as Record<string, unknown> | undefined;
    const contactId = substitutions?.contactId;
    return typeof contactId === "string" && contactId.length > 0 ? contactId : undefined;
  }

  protected async resolveTemplateOrThrow<T extends Record<string, any> = any>(
    mail: Mail,
    substitutions?: T,
    bypassCache?: boolean
  ): Promise<{ html: string; text: string }> {
    const resolvedTemplate = await this.resolveTemplate(mail, substitutions, bypassCache);
    if (resolvedTemplate.errors && resolvedTemplate.errors.length > 0) {
      throw new Error(resolvedTemplate.errors.map(error => error.message).join("\n"));
    }
    return {
      html: resolvedTemplate.html,
      text: resolvedTemplate.text,
    };
  }

  protected async resolveDeliveryPlan(mail: Mail): Promise<DeliveryPlan<EmailType>[]> {
    const groupingPolicy = this.resolveRecipientGroupingPolicy(mail);
    if (groupingPolicy === "per-recipient") {
      return Promise.all(
        mail.recipients.map(async recipient => {
          const substitutions = this.mergeSubstitutions(mail.substitutions, recipient.substitutions);
          const resolvedTemplate = await this.resolveTemplateOrThrow(mail, substitutions);
          const contactId = this.extractRecipientContactId(recipient);
          return {
            ...this.mapRecipientAddresses(recipient),
            contactIds: contactId ? [contactId] : [],
            html: resolvedTemplate.html,
            text: resolvedTemplate.text,
            recipientCount: 1,
          };
        })
      );
    }

    const resolvedTemplate = await this.resolveTemplateOrThrow(mail);
    const mappedRecipients = mail.recipients.map(recipient => this.mapRecipientAddresses(recipient));
    const contactIds = mail.recipients.map(recipient => this.extractRecipientContactId(recipient));
    return [
      {
        to: mappedRecipients.flatMap(recipient => recipient.to),
        cc: mappedRecipients.flatMap(recipient => recipient.cc),
        bcc: mappedRecipients.flatMap(recipient => recipient.bcc),
        contactIds,
        html: resolvedTemplate.html,
        text: resolvedTemplate.text,
        recipientCount: mail.recipients.length,
      },
    ];
  }

  protected async sendWithDeliveryPlan(
    deliveryPlan: DeliveryPlan<EmailType>[],
    sender: (item: DeliveryPlan<EmailType>) => Promise<void | DeliverySendResult>
  ): Promise<number> {
    let sentCount = 0;
    for (const [index, item] of deliveryPlan.entries()) {
      try {
        const result = await sender(item);
        const contactIds = this.#normalizeContactIds(item.contactIds, item.recipientCount);
        const providerMailId = item.recipientCount === 1 ? result?.providerMailId : undefined;
        await this.#transportConfig.mailLogStorage(
          contactIds.map(contactId => ({
            contactId,
            providerId: this.providerId,
            providerMailId,
          }))
        );
        sentCount += item.recipientCount;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to send delivery item ${index + 1}/${deliveryPlan.length}: ${message}`);
      }
    }

    return sentCount;
  }

  #normalizeContactIds(contactIds: Array<string | undefined>, recipientCount: number): Array<string | undefined> {
    if (contactIds.length >= recipientCount) {
      return contactIds.slice(0, recipientCount);
    }
    return contactIds.concat(Array(recipientCount - contactIds.length).fill(undefined));
  }

  protected abstract readonly providerId: string;
  protected abstract mapMailAddress(contact: MailContact, type?: RecipientType): EmailType;
}
