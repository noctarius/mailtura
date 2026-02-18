import {
  isDirectContent,
  isTemplatedContent,
  Mail,
  MailContent,
  MailDirectContent,
} from "@mailtura/rpcmodel/mails/index.js";
import { getRpcManager } from "../rpc/index.js";
import {
  createTemplateCompiler,
  ResolvedTemplate,
  TemplateCompiler,
  TemplateResolver,
} from "@mailtura/contentcompiler";

type UrlProxy = ResolvedTemplate["urlRelocations"][number];

const rpcManager = getRpcManager();

export interface TransportConfig {
  apiBase: string;
  templateResolver: TemplateResolver;
  urlRelocationStorage: (urlRelocations: UrlProxy[]) => Promise<void>;
}

export interface Transport {
  send(mail: Mail): Promise<number>;
}

export abstract class AbstractTransport implements Transport {
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
    content: MailContent,
    substitutions: T,
    bypassCache?: boolean
  ): Promise<Omit<ResolvedTemplate, "urlRelocations">> {
    const resolvedTemplate = await this.#contentCompiler.resolveTemplate(content, substitutions, bypassCache);
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
}
