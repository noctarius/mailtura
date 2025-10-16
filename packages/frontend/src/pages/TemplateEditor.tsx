import { MonacoEditor } from "solid-monaco";
import { Code, Copy, Eye, Save, Send, Settings, Triangle } from "lucide-solid";
import { usePreviewTemplateQuery } from "../services/templates/use-preview-template-query.js";
import { createSignal } from "solid-js";

const Templates = () => {
  const [editorMode, setEditorMode] = createSignal<"visual" | "html">("visual");
  const [templateIndex, setTemplateIndex] = createSignal(0);
  const [selectedTemplate, setSelectedTemplate] = createSignal("welcome");
  const [htmlContent, setHtmlContent] = createSignal(`<mjml>
    <mj-body>
        <mj-section>
            <mj-column>
                <mj-text>{{firstName}}</mj-text>
            </mj-column>
            <mj-column>
                <mj-text>{{lastName}}</mj-text>
            </mj-column>
        </mj-section>
    </mj-body>
</mjml>`);

  const templates = [
    { id: "welcome", name: "Welcome Email", category: "Onboarding" },
    {
      id: "newsletter",
      name: "Newsletter",
      category: "Marketing",
    },
    { id: "promo", name: "Promotional", category: "Marketing" },
    {
      id: "forgot",
      name: "Password Reset",
      category: "Transactional",
    },
    { id: "receipt", name: "Order Receipt", category: "Transactional" },
    { id: "delivery", name: "Delivery Notice", category: "Transactional" },
    { id: "delivered", name: "Package delivered", category: "Transactional" },
  ];

  const previewTemplateQuery = usePreviewTemplateQuery({
    tenantId: "af52e600-5ead-4ffd-9cfa-de4f104b5518",
    templateId: "af52e600-5ead-4ffd-9cfa-de4f104b5518",
    content: htmlContent,
  });

  return (
    <div class="h-lvh flex flex-col bg-gray-50 overflow-hidden">
      {/* Template Sidebar */}
      <div class="bg-white border-r border-gray-200 flex">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Email Templates</h2>
          <p class="text-sm text-gray-600 mt-1">Create and manage your email templates</p>
        </div>

        <div class="flex-1 p-4">
          <div class="grid grid-cols-[40px_repeat(5,1fr)_40px] gap-2 items-center justify-center">
            <div class="flex justify-center items-center h-full">
              <button
                class="template-editor-selector-arrow bg-blue-50 border-2 p-1 rounded items-center justify-center"
                disabled={templateIndex() === 0}
              >
                <Triangle
                  class={"w-6 h-6"}
                  onClick={() => setTemplateIndex(templateIndex() - 1)}
                  style={{ "transform": "rotate(-90deg)", "transform-origin": "center", "transform-box": "fill-box" }}
                />
              </button>
            </div>
            {templates.slice(templateIndex(), Math.min(templateIndex() + 5, templates.length)).map(template => (
              <div
                onClick={() => setSelectedTemplate(template.id)}
                class={`p-3 rounded-lg cursor-pointer h-full text-center transition-colors border ${selectedTemplate() === template.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
              >
                <div class="font-medium text-gray-900">{template.name}</div>
                <div class="text-sm text-gray-500">{template.category}</div>
              </div>
            ))}
            <div class="flex justify-center items-center h-full">
              <button
                class="template-editor-selector-arrow bg-blue-50 border-2 p-1 rounded items-center justify-center"
                disabled={templateIndex() >= templates.length - 5}
              >
                <Triangle
                  class={"w-6 h-6"}
                  onClick={() => setTemplateIndex(templateIndex() + 1)}
                  style={{ "transform": "rotate(90deg)", "transform-origin": "center", "transform-box": "fill-box" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div class="flex-1 flex flex-col">
        {/* Toolbar */}
        <div class="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h3 class="text-lg font-semibold text-gray-900">Welcome Email</h3>
            <div class="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setEditorMode("visual")}
                class={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${editorMode() === "visual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Eye class="w-4 h-4 inline mr-1" />
                Visual
              </button>
              <button
                onClick={() => setEditorMode("html")}
                class={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${editorMode() === "html" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Code class="w-4 h-4 inline mr-1" />
                HTML
              </button>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <button class="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Copy class="w-4 h-4" />
            </button>
            <button class="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Settings class="w-4 h-4" />
            </button>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Send class="w-4 h-4 inline mr-2" />
              Test Send
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save class="w-4 h-4 inline mr-2" />
              New Template
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save class="w-4 h-4 inline mr-2" />
              Save Template
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div class="flex-1 flex">
          {editorMode() === "html" ? (
            <div class="w-1/2 border-r border-gray-200">
              <MonacoEditor
                height="100vh"
                width="100%"
                language="html"
                value={htmlContent()}
                options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
                onChange={e => setHtmlContent(e)}
              />
            </div>
          ) : (
            <div class="w-1/2 p-4 bg-gray-50 border-r border-gray-200">
              <div class="bg-white rounded-lg p-6 shadow-sm">
                <h4 class="text-lg font-semibold mb-4">Visual Editor</h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                    <input
                      type="text"
                      placeholder="Welcome to EmailFlow!"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Preheader Text</label>
                    <input
                      type="text"
                      placeholder="Thanks for joining us - let's get started"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Header Color</label>
                    <input
                      type="color"
                      placeholder="#3b82f6"
                      class="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div class="w-1/2 bg-gray-100 p-4">
            <div class="bg-white rounded-lg h-full overflow-auto">
              <div class="p-4 border-b border-gray-200 bg-gray-50">
                <h4 class="font-semibold text-gray-900">Preview</h4>
              </div>
              {!previewTemplateQuery.isLoading && (
                <iframe
                  srcdoc={previewTemplateQuery.data}
                  class="p-4 w-full h-full border-none"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
