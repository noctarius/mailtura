import {
  isDirectContent,
  isTemplatedContent,
  Mail,
  MailContent,
  MailDirectContent,
} from "@mailtura/rpcmodel/mails/index.js";
import { getRpcManager } from "../rpc/index.js";

const rpcManager = getRpcManager();

export interface Transport {
  send(mail: Mail): Promise<number>;
}

export abstract class AbstractTransport implements Transport {
  readonly #tenantId: string;

  protected constructor(tenantId: string) {
    this.#tenantId = tenantId;
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
}
