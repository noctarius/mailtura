import {
  isDirectContent,
  isTemplatedContent,
  Mail,
  MailContact,
  MailContent,
  MailDirectContent,
  MailRecipient,
} from "@mailtura/rpcmodel/mails/index.js";
import { getRpcManager } from "../rpc/index.js";
import {
  createTemplateCompiler,
  ResolvedTemplate,
  TemplateCompiler,
  TemplateCompilerConfig,
  TemplateResolver,
} from "@mailtura/contentcompiler";

type UrlProxy = ResolvedTemplate["urlRelocations"][number];

const rpcManager = getRpcManager();

export type RecipientType = "to" | "cc" | "bcc";
export type RecipientGroupingPolicy = "auto" | "joined" | "per-recipient";

export interface DeliveryPlan<EmailType> {
  to: EmailType[];
  cc: EmailType[];
  bcc: EmailType[];
  html: string;
  text: string;
  recipientCount: number;
}

export interface TransportConfig {
  apiBase: string;
  templateResolver: TemplateResolver;
  urlRelocationStorage: (urlRelocations: UrlProxy[]) => Promise<void>;
}

export interface Transport {
  send(mail: Mail): Promise<number>;
}

export abstract class AbstractTransport<EmailType> implements Transport {
  readonly #tenantId: string;
  readonly #transportConfig: TransportConfig;
  readonly #contentCompiler: TemplateCompiler;

  protected constructor(tenantId: string, transportConfig: TransportConfig) {
    this.#tenantId = tenantId;
    this.#transportConfig = transportConfig;
    this.#contentCompiler = createTemplateCompiler(transportConfig.templateResolver, transportConfig.apiBase);
  }

  protected async getTemplateContent(content: MailContent): Promise<MailDirectContent> {
    if (isDirectContent(content)) {
      return content;
    }
    if (isTemplatedContent(content)) {
      const template = await rpcManager.readTemplate(this.#tenantId, content.templateId);
      const templateContent = template.content;
      return {
        content: templateContent,
        isTemplate: true,
      };
    }
    throw new Error("Unsupported content type");
  }

  abstract send(mail: Mail): Promise<number>;

  protected mergeSubstitutions(
    templateSubstitutions: Record<string, string> | undefined,
    mailSubstitutions: Record<string, string> | undefined,
    recipientSubstitutions: Record<string, string> | undefined
  ): Record<string, string> {
    return {
      ...(templateSubstitutions ?? {}),
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
    return "auto";
  }

  protected resolveRecipientGroupingPolicy(mail: Mail): Exclude<RecipientGroupingPolicy, "auto"> {
    const policy = this.recipientGroupingPolicy(mail);
    if (policy !== "auto") return policy;
    return this.hasSubstitutions(mail) ? "per-recipient" : "joined";
  }

  protected normalizeRecipients(contacts: MailContact | MailContact[] | undefined): MailContact[] {
    if (!contacts) return [];
    return Array.isArray(contacts) ? contacts : [contacts];
  }

  protected mapMailAddresses(contacts: MailContact | MailContact[] | undefined, type?: RecipientType): EmailType[] {
    return this.normalizeRecipients(contacts).map(contact => this.mapMailAddress(contact, type));
  }

  protected mapRecipientAddresses(recipient: MailRecipient): Pick<DeliveryPlan<EmailType>, "to" | "cc" | "bcc"> {
    return {
      to: this.mapMailAddresses(recipient.to, "to"),
      cc: this.mapMailAddresses(recipient.cc, "cc"),
      bcc: this.mapMailAddresses(recipient.bcc, "bcc"),
    };
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
    const content = await this.getTemplateContent(mail.content);

    if (groupingPolicy === "per-recipient") {
      return Promise.all(
        mail.recipients.map(async recipient => {
          const substitutions = this.mergeSubstitutions(
            content.substitutions,
            mail.substitutions,
            recipient.substitutions
          );
          const resolvedTemplate = await this.resolveTemplateOrThrow(mail, substitutions);
          return {
            ...this.mapRecipientAddresses(recipient),
            html: resolvedTemplate.html,
            text: resolvedTemplate.text,
            recipientCount: 1,
          };
        })
      );
    }

    const resolvedTemplate = await this.resolveTemplateOrThrow(mail);
    const mappedRecipients = mail.recipients.map(recipient => this.mapRecipientAddresses(recipient));
    return [
      {
        to: mappedRecipients.flatMap(recipient => recipient.to),
        cc: mappedRecipients.flatMap(recipient => recipient.cc),
        bcc: mappedRecipients.flatMap(recipient => recipient.bcc),
        html: resolvedTemplate.html,
        text: resolvedTemplate.text,
        recipientCount: mail.recipients.length,
      },
    ];
  }

  protected async sendWithDeliveryPlan<T>(
    deliveryPlan: DeliveryPlan<EmailType>[],
    sender: (item: DeliveryPlan<EmailType>) => Promise<T>
  ): Promise<number> {
    let sentCount = 0;

    for (const [index, item] of deliveryPlan.entries()) {
      try {
        await sender(item);
        sentCount += item.recipientCount;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to send delivery item ${index + 1}/${deliveryPlan.length}: ${message}`);
      }
    }

    return sentCount;
  }

  protected abstract mapMailAddress(contact: MailContact, type?: RecipientType): EmailType;
}
