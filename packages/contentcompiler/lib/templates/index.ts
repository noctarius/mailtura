import type { Template } from "@mailtura/rpcmodel/lib/api/index.js";
import {
  isDirectContent,
  isTemplatedContent,
  type MailContent,
  MailDirectContent,
} from "@mailtura/rpcmodel/lib/mails/index.js";
import { Cacheable } from "cacheable";
import { convert } from "html-to-text";
import * as cheerio from "cheerio";
import mjml2html from "mjml";
import htmlnano from "htmlnano";
import { Liquid, LiquidError, RenderError, type Template as LiquidTemplate } from "liquidjs";
import { v7 } from "uuid";
import { joinPath } from "@mailtura/rpcmodel/lib/helpers/index.js";

declare class LiquidErrors extends LiquidError {
  errors: RenderError[];
}

const isLiquidErrors = (e: unknown): e is LiquidErrors => e instanceof LiquidError && "errors" in e;

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/g;

type TemplateFunction<T> = (context: T) => string;

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
    bypassCache?: boolean
  ): Promise<ResolvedTemplate>;
}

export function createTemplateCompiler(templateResolver: TemplateResolver, apiBase: string): TemplateCompiler {
  return new TemplateCompilerImpl(templateResolver, apiBase);
}

export function isTemplateError<T>(
  templateOrError: T | { errors: TemplateError[] }
): templateOrError is { errors: TemplateError[] } {
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
    bypassCache = false
  ): Promise<ResolvedTemplate> {
    const template = await this.#getTemplateContent(content);
    if (!template) {
      return {
        html: "",
        text: "",
        urlRelocations: [],
        errors: [{ type: "resolver", line: 0, column: 0, message: "Template not found" }],
      };
    }

    const compiledTemplate = await this.#precompileTemplate<T>(template, bypassCache);
    if (!compiledTemplate) throw new Error("Failed to precompile template");
    if (isTemplateError(compiledTemplate)) {
      return { errors: compiledTemplate.errors, html: "", text: "", urlRelocations: [] };
    }
    return { ...(await this.#renderTemplate(compiledTemplate, substitutions)), errors: undefined };
  }

  registerMjmlComponent(name: string, component: string): void {

  }

  async #renderTemplate<T extends Record<string, any>>(template: ApplicableTemplate<T>, substitutions: T) {
    // Resolve the actual templates
    const html = template.html(substitutions);
    const text = template.text?.(substitutions);

    const proxiedHtml = this.#proxyHtmlUrls(html);
    const proxiedText = this.#proxyTextUrls(text ?? convert(html, { wordwrap: 120 }));

    const minifiedHtml = await htmlnano.process(proxiedHtml.content, {
      removeComments: "safe",
      minifyCss: false,
      minifySvg: false,
    });

    return {
      html: minifiedHtml.html,
      text: proxiedText.content,
      urlRelocations: [...proxiedHtml.urlRelocations, ...proxiedText.urlRelocations],
      errors: undefined,
    };
  }

  #generateProxyUrl(url: string | undefined, position: number, contactId?: string): UrlProxy | undefined {
    if (!url || url.startsWith("http")) return undefined;

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

  #proxyHtmlUrls(html: string, contactId?: string): ProxyingResult {
    const urlRelocations: UrlProxy[] = [];

    const $ = cheerio.load(html);
    $("a, img").each((pos, el) => {
      const element = $(el);
      const href = element.attr("href");
      const src = element.attr("src");

      const from = href || src;
      const urlProxy = this.#generateProxyUrl(from, pos, contactId);
      if (!urlProxy) return;

      urlRelocations.push(urlProxy);
      element.attr(href ? "href" : "src", urlProxy.to);
    });

    return { content: $.html(), urlRelocations };
  }

  #proxyTextUrls(text: string, contactId?: string): ProxyingResult {
    const urlRelocations: UrlProxy[] = [];

    const matches = text.matchAll(urlRegex);
    const parts = matches.reduce(
      (state, match, pos) => {
        const url = match[0];
        const startIndex = match.index;
        const endIndex = match.index + url.length;

        if (state.startIndex < startIndex) {
          state.segments.push(text.slice(state.startIndex, startIndex));
        }

        const proxyUrl = this.#generateProxyUrl(url, pos, contactId);
        if (proxyUrl) {
          urlRelocations.push(proxyUrl);
          state.segments.push(proxyUrl.to);
        } else {
          state.segments.push(url);
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

  async #precompileTemplate<T extends Record<string, any>>(template: MailDirectContent, bypassCache: boolean) {
    const key = this.#templateCache.hash(template.content);
    const cached = !bypassCache ? await this.#templateCache.get<ApplicableTemplate<T>>(key) : undefined;
    if (cached) return cached;

    const compiler = async (): Promise<ApplicableTemplate<T> | { errors: TemplateError[] }> => {
      if (!template.isTemplate) {
        return {
          html: () => template.content,
          text: template.textContent ? () => template.textContent! : undefined,
        };
      }

      const htmlTemplate = this.#compileHtmlTemplate<T>(template.content);
      if (isTemplateError(htmlTemplate)) {
        return { errors: htmlTemplate.errors };
      }

      const textTemplate = this.#compileTextTemplate<T>(template.textContent);
      if (isTemplateError(textTemplate)) {
        return { errors: textTemplate.errors };
      }

      return { html: htmlTemplate, text: textTemplate, errors: undefined };
    };

    const result = await compiler();
    if (isTemplateError(result)) return result;

    if (!bypassCache) await this.#templateCache.set(key, result);
    return result;
  }

  #compileTextTemplate<T extends Record<string, any>>(template?: string) {
    if (!template) return undefined;
    const staging = this.#compileLiquidTemplate(template);
    if (isTemplateError(staging)) return { errors: staging.errors };
    if (!staging) return undefined;
    return (context: T) => staging.engine.renderSync(staging.template, context);
  }

  #compileHtmlTemplate<T extends Record<string, any>>(template: string) {
    // We need to precompile the Liquid template twice to get syntax errors at the correct location
    const stage1 = this.#compileLiquidTemplate(template);
    const stage2 = this.#compileMjmlTemplate(template);
    if ((stage1.errors && stage1.errors?.length > 0) || (stage2.errors && stage2.errors?.length > 0)) {
      return {
        errors: [...(stage1.errors ?? []), ...(stage2.errors ?? [])].sort((a, b) =>
          a.line === b.line ? 0 : a.line < b.line ? -1 : 1
        ),
      };
    }

    const stage3 = this.#compileLiquidTemplate(stage2.template);
    return (context: T) => stage3.engine.renderSync(stage3.template, context ?? {});
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
  }
}
