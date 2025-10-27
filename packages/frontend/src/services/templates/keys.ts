import * as murmurhash from "@jsr/timepp__murmurhash";

export const templateKeys = {
  templates: (tenantId: string) => ["templates", tenantId] as const,
  template_preview: (tenantId: string, templateId: string, content: string) => {
    const contentHash = murmurhash.murmurHash3_x86_128(content).toString();
    return ["templates", tenantId, templateId, contentHash, "preview"] as const;
  },
};
