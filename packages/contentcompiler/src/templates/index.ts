import type { Template } from "@mailtura/rpcmodel/api/index.js";
import {
  isDirectContent,
  isTemplatedContent,
  Mail,
  type MailContent,
  MailDirectContent,
} from "@mailtura/rpcmodel/mails/index.js";
import { Cacheable } from "cacheable";
import { convert } from "html-to-text";
import * as cheerio from "cheerio";
import mjml2html from "mjml";
import htmlnano from "htmlnano";
import { Liquid, LiquidError, RenderError, type Template as LiquidTemplate } from "liquidjs";
import { v7 } from "uuid";
import { joinPath } from "@mailtura/rpcmodel/helpers/index.js";

declare class LiquidErrors extends LiquidError {
  errors: RenderError[];
}

const isLiquidErrors = (e: unknown): e is LiquidErrors => e instanceof LiquidError && "errors" in e;

const mergeSubstitutions = (a?: Record<string, string>, b?: Record<string, string>): Record<string, string> => ({
  ...(a ?? {}),
  ...(b ?? {}),
});

const urlRegex = /\bhttps?:\/\/[^\s<>"']+/g;
const trailingUrlDelimiterRegex = /[)\]}.,;:!?]+$/;

type TemplateFunction<T> = (context: T) => Promise<string>;

interface ApplicableTemplate<T extends Record<string, any> = any> {
  html: TemplateFunction<T>;
  text?: TemplateFunction<T>;
}

interface UrlProxy {
  id: string;
  from: string;
  to: string;
  contactId?: string;
  position: number;
}

interface ProxyingResult {
  content: string;
  urlRelocations: UrlProxy[];
}

export type TemplateCompilerConfig = Required<Mail["features"]> & {
  bypassCache: boolean;
};

export type TemplateResolver = (templateId: string) => Promise<Template | undefined>;

export interface TemplateError {
  type: "liquid" | "mjml" | "resolver";
  line: number;
  column: number;
  message: string;
  input?: string;
}

export interface ResolvedTemplate {
  html: string;
  text: string;
  urlRelocations: UrlProxy[];
  errors?: TemplateError[];
}

export interface TemplateCompiler {
  registerMjmlComponent(name: string, component: string): void;
  resolveTemplate<T extends Record<string, any> = any>(
    content: MailContent,
    substitutions: T,
    config?: Partial<TemplateCompilerConfig>
  ): Promise<ResolvedTemplate>;
}

export function createTemplateCompiler(templateResolver: TemplateResolver, apiBase: string): TemplateCompiler {
  return new TemplateCompilerImpl(templateResolver, apiBase);
}

export function isTemplateError<T>(
  templateOrError: T | { errors: TemplateError[] }
): templateOrError is { errors: TemplateError[] } {
  if (templateOrError === undefined) return false;
  return (
    templateOrError &&
    typeof templateOrError === "object" &&
    "errors" in templateOrError &&
    templateOrError.errors?.length > 0
  );
}

class TemplateCompilerImpl implements TemplateCompiler {
  readonly #templateCache = new Cacheable();
  readonly #templateResolver: TemplateResolver;
  readonly #apiBase: string;

  constructor(templateResolver: TemplateResolver, apiBase: string) {
    this.#templateResolver = templateResolver;
    this.#apiBase = apiBase;
  }

  async resolveTemplate<T extends Record<string, any>>(
    content: MailContent,
    substitutions: T,
    config?: Partial<TemplateCompilerConfig>
  ): Promise<ResolvedTemplate> {
    const normalizedConfig: TemplateCompilerConfig = {
      embedImages: false,
      trackOpens: false,
      trackClicks: false,
      minifyHtml: false,
      minifyCss: false,
      minifySvg: false,
      bypassCache: false,
      ...(config ?? {}),
    };

    const template = await this.#getTemplateContent(content);
    if (!template) {
      return {
        html: "",
        text: "",
        urlRelocations: [],
        errors: [{ type: "resolver", line: 0, column: 0, message: "Template not found" }],
      };
    }

    const compiledTemplate = await this.#precompileTemplate<T>(template, normalizedConfig);
    if (!compiledTemplate) throw new Error("Failed to precompile template");
    if (isTemplateError(compiledTemplate)) {
      return { errors: compiledTemplate.errors, html: "", text: "", urlRelocations: [] };
    }
    return { ...(await this.#renderTemplate(compiledTemplate, substitutions, normalizedConfig)), errors: undefined };
  }

  registerMjmlComponent(name: string, component: string): void {}

  async #renderTemplate<T extends Record<string, any>>(
    template: ApplicableTemplate<T>,
    substitutions: T,
    config: TemplateCompilerConfig
  ): Promise<ResolvedTemplate> {
    // Resolve the actual templates
    const html = await template.html(substitutions);
    const text = await template.text?.(substitutions);

    const enableTracking = config.trackOpens || config.trackClicks;
    const proxiedHtml = this.#proxyHtmlUrls(html, enableTracking, config.embedImages);
    const proxiedText = this.#proxyTextUrls(text ?? convert(html, { wordwrap: 120 }), enableTracking);

    const minifiedHtml = config.minifyHtml
      ? await htmlnano.process(proxiedHtml.content, {
          removeComments: "safe",
          minifyCss: config.minifyCss,
          minifySvg: config.minifySvg,
        })
      : { html: proxiedHtml.content };

    return {
      html: minifiedHtml.html,
      text: proxiedText.content,
      urlRelocations: [...proxiedHtml.urlRelocations, ...proxiedText.urlRelocations],
      errors: undefined,
    };
  }

  #generateProxyUrl(url: string | undefined, position: number, contactId?: string): UrlProxy | undefined {
    if (!url || !url.startsWith("http")) return undefined;

    const id = v7();
    const proxyUrl = joinPath(this.#apiBase, "tracking", id);
    return {
      id,
      from: url,
      to: proxyUrl,
      position,
      contactId,
    };
  }

  #proxyHtmlUrls(html: string, enableTracking: boolean, embedImages: boolean, contactId?: string): ProxyingResult {
    if (!enableTracking) return { content: html, urlRelocations: [] };

    const urlRelocations: UrlProxy[] = [];
    const $ = cheerio.load(html);

    // Find all links and images, or just links is images are being embedded into the mail
    $(embedImages ? "a" : "a, img").each((pos, el) => {
      const element = $(el);

      const href = element.attr("href");
      const src = element.attr("src");

      const from = href || src;
      const urlProxy = this.#generateProxyUrl(from, pos + 1, contactId);
      if (!urlProxy) return;

      urlRelocations.push(urlProxy);
      element.attr(href ? "href" : "src", urlProxy.to);
    });

    return { content: $.html(), urlRelocations };
  }

  #proxyTextUrls(text: string, enableTracking: boolean, contactId?: string): ProxyingResult {
    if (!enableTracking) return { content: text, urlRelocations: [] };

    const urlRelocations: UrlProxy[] = [];
    const matches = text.matchAll(urlRegex);
    const parts = matches.reduce(
      (state, match, pos) => {
        const rawUrl = match[0];
        const trimmedUrl = rawUrl.replace(trailingUrlDelimiterRegex, "");
        const suffix = rawUrl.slice(trimmedUrl.length);
        const startIndex = match.index;
        const endIndex = match.index + rawUrl.length;

        if (state.startIndex < startIndex) {
          state.segments.push(text.slice(state.startIndex, startIndex));
        }

        const proxyUrl = this.#generateProxyUrl(trimmedUrl, pos + 1, contactId);
        if (proxyUrl) {
          urlRelocations.push(proxyUrl);
          state.segments.push(proxyUrl.to);
        } else {
          state.segments.push(rawUrl);
        }

        if (suffix.length > 0) {
          state.segments.push(suffix);
        }

        state.startIndex = endIndex;
        return state;
      },
      {
        startIndex: 0,
        segments: [] as string[],
      }
    );

    // Add remaining text after last match
    parts.segments.push(text.slice(parts.startIndex));

    return { content: parts.segments.join(""), urlRelocations };
  }

  async #getTemplateContent(content: MailContent): Promise<MailDirectContent | undefined> {
    if (isDirectContent(content)) {
      return content;
    }
    if (isTemplatedContent(content)) {
      const template = await this.#templateResolver(content.templateId);
      if (!template) return undefined;
      return { content: template.content, isTemplate: true };
    }
    throw new Error("Unsupported content type");
  }

  async #precompileTemplate<T extends Record<string, any>>(
    template: MailDirectContent,
    config: TemplateCompilerConfig
  ) {
    const key = this.#templateCache.hash(`${template.content}|embedImages:${config.embedImages ? "1" : "0"}`);
    const cached = !config.bypassCache ? await this.#templateCache.get<ApplicableTemplate<T>>(key) : undefined;
    if (cached) return cached;

    const compiler = async (): Promise<ApplicableTemplate<T> | { errors: TemplateError[] }> => {
      if (typeof template.isTemplate === "undefined" || !template.isTemplate) {
        return {
          html: async () => template.content,
          text: template.textContent ? async () => template.textContent! : undefined,
        };
      }

      const htmlTemplate = this.#compileHtmlTemplate<T>(template.content, config, template.substitutions);
      if (isTemplateError(htmlTemplate)) {
        return { errors: htmlTemplate.errors };
      }

      const textTemplate = this.#compileTextTemplate<T>(template.textContent, template.substitutions);
      if (isTemplateError(textTemplate)) {
        return { errors: textTemplate.errors };
      }

      return { html: htmlTemplate, text: textTemplate, errors: undefined };
    };

    const result = await compiler();
    if (isTemplateError(result)) return result;

    if (!config.bypassCache) await this.#templateCache.set(key, result);
    return result;
  }

  #compileTextTemplate<T extends Record<string, any>>(template?: string, substitutions?: Record<string, string>) {
    if (!template) return undefined;
    const staging = this.#compileLiquidTemplate(template);
    if (isTemplateError(staging)) return { errors: staging.errors };
    if (!staging) return undefined;
    return (context: T) => staging.engine.renderSync(staging.template, mergeSubstitutions(substitutions, context));
  }

  #compileHtmlTemplate<T extends Record<string, any>>(
    template: string,
    config: TemplateCompilerConfig,
    substitutions?: Record<string, string>
  ) {
    // We need to precompile the Liquid template twice to get syntax errors at the correct location
    const liquid = this.#compileLiquidTemplate(template);
    const mjml = this.#compileMjmlTemplate(template);
    if ((liquid.errors && liquid.errors?.length > 0) || (mjml.errors && mjml.errors?.length > 0)) {
      return {
        errors: [...(liquid.errors ?? []), ...(mjml.errors ?? [])].sort((a, b) =>
          a.line === b.line ? 0 : a.line < b.line ? -1 : 1
        ),
      };
    }

    const stage1 = this.#compileMjmlTemplate(this.#wrapLiquidLogic(template));
    const stage2 = this.#compileLiquidTemplate(stage1.template);

    return async (context: T) => {
      const html = stage2.engine.renderSync(stage2.template, mergeSubstitutions(substitutions, context));
      if (!config.embedImages) return html;
      return await this.#embedHtmlImages(html);
    };
  }

  async #embedHtmlImages(html: string): Promise<string> {
    const $ = cheerio.load(html);
    const images = $("img[src]")
      .toArray()
      .map(el => $(el));

    await Promise.all(
      images.map(async image => {
        const src = image.attr("src");
        if (!src || !/^https?:\/\//i.test(src)) return;

        try {
          const response = await fetch(src);
          if (!response.ok) return;

          const arrayBuffer = await response.arrayBuffer();
          const contentType = response.headers.get("content-type")?.split(";")[0] ?? "application/octet-stream";
          const encoded = Buffer.from(arrayBuffer).toString("base64");
          image.attr("src", `data:${contentType};base64,${encoded}`);
        } catch {
          // Keep original src when embedding fails.
        }
      })
    );

    return $.html();
  }

  #wrapLiquidLogic(template: string): string {
    const alreadyWrapped = /<mj-raw>\s*(\{%[\s\S]*?%})\s*<\/mj-raw>/;
    const logicTagRegex = /\{%\s*[\s\S]*?%}/g;
    const wrap = (match: string) => (alreadyWrapped.test(match) ? match : `<mj-raw>${match}</mj-raw>`);
    return template.replace(logicTagRegex, wrap);
  }

  #compileLiquidTemplate(template: string): { engine: Liquid; template: LiquidTemplate[]; errors?: TemplateError[] } {
    const liquid = new Liquid({ catchAllErrors: true });
    try {
      return { engine: liquid, template: liquid.parse(template), errors: undefined };
    } catch (e) {
      if (!isLiquidErrors(e)) {
        throw e;
      }
      return {
        engine: liquid,
        template: [],
        errors: e.errors.map(e => {
          const position = e.token.getPosition();
          return {
            type: "liquid",
            line: position[0] ?? 0,
            column: position[1] ?? 0,
            message: e.message,
          };
        }),
      };
    }
  }

  #compileMjmlTemplate(template: string): { template: string; errors?: TemplateError[] } {
    try {
      const parserResult = mjml2html(template, { validationLevel: "strict" });
      if (!parserResult.errors || parserResult.errors.length > 0) {
        return { template: parserResult.html, errors: undefined };
      }
      return {
        template: parserResult.html,
        errors: parserResult.errors.map(e => ({
          type: "mjml",
          line: e.line,
          column: 0,
          message: e.message,
        })),
      };
    } catch (e: any) {
      return { template: "", errors: [{ type: "mjml", line: 0, column: 0, message: e.toString() }] };
    }
  }
}
