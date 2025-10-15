import { render } from "solid-js/web";
import "./index.css";
import App from "./App.js";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "html" || label === "handlebars" || label === "razor")
      return new Worker(new URL("monaco-editor/esm/vs/language/html/html.worker?worker", import.meta.url), {
        type: "module",
      });
    return new Worker(new URL("monaco-editor/esm/vs/editor/editor.worker?worker", import.meta.url), { type: "module" });
  },
};

const wrapper = document.getElementById("root");
if (!wrapper) throw new Error("Wrapper div not found");

render(() => <App />, wrapper);
