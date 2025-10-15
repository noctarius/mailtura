import { render } from "solid-js/web";
import "./index.css";
import App from "./App.js";

const wrapper = document.getElementById("root");
if (!wrapper) throw new Error("Wrapper div not found");

render(() => <App />, wrapper);
