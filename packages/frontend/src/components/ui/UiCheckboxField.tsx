import { For } from "solid-js";
import { UiInputFieldProps } from "./UiInputField.js";
import { filterProps } from "@solid-primitives/props";

export interface UiCheckboxFieldProps extends UiInputFieldProps {
  options?: () => { label: string; value: string | number }[];
}

export default function UiCheckboxField(props: UiCheckboxFieldProps) {
  const hasError = () => props.error && props.error().length > 0;
  const options = () => props.options?.() || [];
  return (
    <>
      <span class={`block text-sm font-medium text-gray-700 mb-2 ${hasError() ? "text-red-900 " : "text-green-900"}`}>
        {props.label()}
      </span>
      <div class="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
        <For each={options()}>
          {option => {
            const value = () => !Array.isArray(props.value) ? [props.value] : props.value;
            const filteredProps = filterProps(props, key => !["options", "error", "label"].includes(key));
            return (
              <>
                <div class="flex items-center space-x-2">
                  <input
                    {...filteredProps}
                    id={`list-${option.value.toString()}`}
                    type="checkbox"
                    value={option.value}
                    checked={value().includes(option.value)}
                    class={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${hasError() ? "text-red-900 " : "text-green-900"}`}
                  />
                  <label
                    for={`list-${option.value}`}
                    class="text-sm text-gray-700 flex-1"
                  >
                    {option.label}
                    {option.value === "all" && <span class="text-gray-400 ml-1">(automatic)</span>}
                  </label>
                </div>
              </>
            );
          }}
        </For>
        {hasError() && <p class="mt-2 text-sm text-red-600">{props.error?.()}</p>}
      </div>
    </>
  );
}
