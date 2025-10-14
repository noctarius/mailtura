import Editor from "@monaco-editor/react";
import { Code, Copy, Eye, Save, Send, Settings, Triangle } from "lucide-react";
import React, { useState } from "react";
import { usePreviewTemplate } from "../services/use-preview-template.js";

const Templates: React.FC = () => {
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");
  const [templateIndex, setTemplateIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("welcome");
  const [htmlContent, setHtmlContent] = useState(`<mjml>
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

  const { data: renderedTemplate, isLoading } = usePreviewTemplate({
    tenantId: "af52e600-5ead-4ffd-9cfa-de4f104b5518",
    templateId: "af52e600-5ead-4ffd-9cfa-de4f104b5518",
    content: htmlContent,
  });

  return (
    <div className="h-lvh flex flex-col bg-gray-50 overflow-hidden">
      {/* Template Sidebar */}
      <div className="bg-white border-r border-gray-200 flex">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Email Templates</h2>
          <p className="text-sm text-gray-600 mt-1">Create and manage your email templates</p>
        </div>

        <div className="flex-1 p-4">
          <div className="grid grid-cols-[40px_repeat(5,1fr)_40px] gap-2 items-center justify-center">
            <div className="flex justify-center items-center h-full">
              <button
                className="template-editor-selector-arrow bg-blue-50 border-2 p-1 rounded items-center justify-center"
                disabled={templateIndex === 0}
              >
                <Triangle
                  className={"w-6 h-6"}
                  onClick={() => setTemplateIndex(templateIndex - 1)}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center", transformBox: "fill-box" }}
                />
              </button>
            </div>
            {templates.slice(templateIndex, Math.min(templateIndex + 5, templates.length)).map(template => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-3 rounded-lg cursor-pointer h-full text-center transition-colors border ${selectedTemplate === template.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
              >
                <div className="font-medium text-gray-900">{template.name}</div>
                <div className="text-sm text-gray-500">{template.category}</div>
              </div>
            ))}
            <div className="flex justify-center items-center h-full">
              <button
                className="template-editor-selector-arrow bg-blue-50 border-2 p-1 rounded items-center justify-center"
                disabled={templateIndex >= templates.length - 5}
              >
                <Triangle
                  className={"w-6 h-6"}
                  onClick={() => setTemplateIndex(templateIndex + 1)}
                  style={{ transform: "rotate(90deg)", transformOrigin: "center", transformBox: "fill-box" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Welcome Email</h3>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setEditorMode("visual")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${editorMode === "visual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Visual
              </button>
              <button
                onClick={() => setEditorMode("html")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${editorMode === "html" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Code className="w-4 h-4 inline mr-1" />
                HTML
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Send className="w-4 h-4 inline mr-2" />
              Test Send
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4 inline mr-2" />
              New Template
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4 inline mr-2" />
              Save Template
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex">
          {editorMode === "html" ? (
            <div className="w-1/2 border-r border-gray-200">
              <Editor
                height="100vh"
                width="100%"
                defaultLanguage="html"
                defaultValue={htmlContent}
                options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
                onChange={e => (e ? setHtmlContent(e) : null)}
              />
            </div>
          ) : (
            <div className="w-1/2 p-4 bg-gray-50 border-r border-gray-200">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Visual Editor</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                    <input
                      type="text"
                      defaultValue="Welcome to EmailFlow!"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preheader Text</label>
                    <input
                      type="text"
                      defaultValue="Thanks for joining us - let's get started"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header Color</label>
                    <input
                      type="color"
                      defaultValue="#3b82f6"
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div className="w-1/2 bg-gray-100 p-4">
            <div className="bg-white rounded-lg h-full overflow-auto">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="font-semibold text-gray-900">Preview</h4>
              </div>
              {!isLoading && (
                <iframe
                  srcDoc={renderedTemplate}
                  className="p-4 w-full h-full border-none"
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
