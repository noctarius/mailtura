import { createTemplateCompiler, isTemplateError } from "../src/index.js";
import type { Template } from "@mailtura/rpcmodel/api/index.js";
import * as expectations from "./templates.test.json";

describe("TemplateCompiler", () => {
  const API_BASE = "https://api.example.test";

  const resolver = (templates: Record<string, Template | undefined>) =>
    async (templateId: string): Promise<Template | undefined> => templates[templateId];

  test("returns resolver error when template id not found", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);

    const result = await compiler.resolveTemplate({ type: "template", templateId: "missing" }, {});

    expect(result.html).toBe("");
    expect(result.text).toBe("");
    expect(result.urlRelocations).toEqual([]);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toMatchObject({ type: "resolver", message: "Template not found" });
  });

  test("catch mjml errors on pure html content", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      isTemplate: true,
      content: "<html></html>",
    }, {});

    expect(result.errors).not.toBeUndefined();
  });

  test("url proxying: empty link", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);

    const result = await compiler.resolveTemplate(
      {
        type: "direct",
        isTemplate: false,
        content: "<html><body><a href=\"\">rel</a> <img src=\"\"/> <a href=\"\">abs</a></body></html>",
      },
      {}
    );

    expect(result.urlRelocations.length).toBe(0);
  });

  test("renders direct content and proxies relative URLs in html and text", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);

    const result = await compiler.resolveTemplate(
      {
        type: "direct",
        isTemplate: false,
        content:
          '<html><body><a href="http://example.com/relative">rel</a> <img src="http://example.com/img.png"/> <a href="http://example.com">abs</a></body></html>',
        textContent: "Visit http://example.com/relative and http://example.com",
      },
      {}
    );

    // HTML: relative href and src should be replaced with proxy URLs
    expect(result.html).toContain("/tracking/");
    expect(result.html).not.toContain('href="http://example.com/relative"');
    expect(result.html).not.toContain('src="http://example.com/img.png"');

    // Text: relative URL proxied, absolute stays intact
    expect(result.text).toContain("/tracking/");
    expect(result.text).not.toContain("http://example.com");

    // urlRelocations should contain entries for the relative link and image
    expect(result.urlRelocations.length).toBe(5);
    const froms = result.urlRelocations.map(u => u.from).sort();
    expect(froms).toEqual(["http://example.com", "http://example.com","http://example.com/", "http://example.com/img.png", "http://example.com/relative"]);
    for (const u of result.urlRelocations) {
      expect(u.to.startsWith(`${API_BASE}/tracking/`)).toBe(true);
      expect(u.id).toBeDefined();
    }
  });

  test("mjml + liquid should render proxied urls", async () => {
    const tmpl: Template = {
      id: "welcome",
      content:
        "<mjml><mj-body><mj-section><mj-column><mj-button href=\"http://example.com/start\">Go</mj-button></mj-column></mj-section></mj-body></mjml>",
    } as unknown as Template; // minimal shape for tests

    const compiler = createTemplateCompiler(
      resolver({ welcome: tmpl }),
      API_BASE
    );

    const result = await compiler.resolveTemplate({ type: "template", templateId: "welcome" }, { name: "John" });

    expect(result.errors).toBeUndefined();
    // mjml turns button into an anchor; ensure proxying happened
    expect(result.html).toContain("/tracking/");
    // at least two relocations: image and button link
    expect(result.urlRelocations.length).toBeGreaterThanOrEqual(1);
  });

  test("isTemplateError helper identifies error-like objects", () => {
    expect(isTemplateError({ errors: [{ type: "mjml", line: 0, column: 0, message: "x" }] })).toBe(true);
    expect(isTemplateError({ errors: [{ type: "liquid", line: 0, column: 0, message: "x" }] })).toBe(true);
    expect(isTemplateError({ errors: [{ type: "resolver", line: 0, column: 0, message: "x" }] })).toBe(true);
    expect(isTemplateError({})).toBe(false);
    expect(isTemplateError(undefined as any)).toBe(false);
  });

  test("mjml should render successfully", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      isTemplate: true,
      content: "<mjml><mj-body><mj-section><mj-column><mj-text>Hello</mj-text></mj-column></mj-section></mj-body></mjml>",
    }, {});

    expect(result.errors).toBeUndefined();
    expect(result.html).toBe(expectations["mjml should render successfully"]);
    expect(result.text).toBe("Hello");
  });

  test("mjml should render links in text successfully", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      isTemplate: true,
      content: '<mjml><mj-body><mj-section><mj-column><mj-text>Hello <a href="http://example.com">Link</a></mj-text></mj-column></mj-section></mj-body></mjml>',
    }, {});

    expect(result.errors).toBeUndefined();
    //expect(result.html).toBe(expectations["mjml should render successfully"]);
    expect(result.text).toContain("[https://api.example.test/tracking/");
  });

  test("undefined isTemplate should behave as not template", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      content: "<html><body>Hello</body></html>",
    }, {});

    expect(result.errors).toBeUndefined();
    expect(result.html).toBe("<html><head></head><body>Hello</body></html>");
    expect(result.text).toBe("Hello");
  });

  test("undefined isTemplate=false should behave as not template", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      isTemplate: false,
      content: "<html><body>Hello</body></html>",
    }, {});

    expect(result.errors).toBeUndefined();
    expect(result.html).toBe("<html><head></head><body>Hello</body></html>");
    expect(result.text).toBe("Hello");
  });

  test("empty mjml string should error out", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      isTemplate: true,
      content: "",
    }, {});

    expect(result.errors).not.toBeUndefined();
    expect(result.errors?.length).toBeGreaterThanOrEqual(1)
  });

  test("mjml should render successfully with execution substitutions", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      isTemplate: true,
      content: "<mjml><mj-body><mj-section><mj-column><mj-text>Hello {{name}}</mj-text></mj-column></mj-section></mj-body></mjml>",
    }, { name: "John" });

    expect(result.errors).toBeUndefined();
    expect(result.html).toBe(expectations["mjml should render successfully with execution substitutions"]);
    expect(result.text).toBe("Hello John");
  });

  test("mjml should render successfully with template substitutions", async () => {
    const compiler = createTemplateCompiler(resolver({}), API_BASE);
    const result = await compiler.resolveTemplate({
      type: "direct",
      isTemplate: true,
      content: "<mjml><mj-body><mj-section><mj-column><mj-text>Hello {{name}}</mj-text></mj-column></mj-section></mj-body></mjml>",
      substitutions: { name: "John" }
    }, {});

    expect(result.errors).toBeUndefined();
    expect(result.html).toBe(expectations["mjml should render successfully with template substitutions"]);
    expect(result.text).toBe("Hello John");
  });
});