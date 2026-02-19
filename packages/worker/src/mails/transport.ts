import {
  isDirectContent,
  isTemplatedContent,
  Mail,
  MailContact,
  MailContent,
  MailDirectContent,
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

  protected mapMailAddresses(contacts: MailContact | MailContact[] | undefined, type?: RecipientType): EmailType[] {
    if (!contacts) return [];
    return (!Array.isArray(contacts) ? [contacts] : contacts).map(contact => this.mapMailAddress(contact, type));
  }

  protected abstract mapMailAddress(contact: MailContact, type?: RecipientType): EmailType;
}
