import { render } from "solid-js/web";
import "./index.css";
import App from "./App.js";
import "state-local"; // Force early import to fix an issue with monaco-editor

// Inject Array::toSort polyfill if not natively available
if (Array.prototype.toSort === undefined) {
  Object.defineProperty(Array.prototype, "toSort", {
    value: function () {
      return this.slice().sort();
    },
    enumerable: true,
    configurable: true,
    writable: true,
  });
}

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "html" || label === "handlebars" || label === "razor")
      return new Worker(new URL("monaco-editor/esm/vs/language/html/html.worker.js?worker", import.meta.url), {
        type: "module",
      });
    return new Worker(new URL("monaco-editor/esm/vs/editor/editor.worker.js?worker", import.meta.url), {
      type: "module",
    });
  },
};

const wrapper = document.getElementById("root");
if (!wrapper) throw new Error("Wrapper div not found");

render(() => <App />, wrapper);
