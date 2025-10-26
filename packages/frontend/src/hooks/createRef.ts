import { createSignal } from "solid-js";

export function createRef<T extends HTMLElement>() {
  const [get, set] = createSignal<T | undefined>(undefined);
  return {
    get current() {
      return get();
    },
    set current(element: T | undefined) {
      set(() => element);
    },
  };
}
