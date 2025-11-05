import { For, JSX } from "solid-js";
import { filterProps } from "@solid-primitives/props";
import { validationErrorToHumanMessage } from "../../helpers/error-to-human-message.js";
import { errorSuccessClass, hasError } from "../../forms/index.js";

export interface UiSelectFieldProps extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  label: () => string;
  description?: () => string;
  error?: () => string;
  options?: () => { label: string; value: string | number; description?: string }[];
}

export default function UiSelectField(props: UiSelectFieldProps) {
  const initialValue = props.value;
  const options = () => props.options?.() || [];
  const filteredProps = filterProps(props, key => !["options", "error", "label"].includes(key));
  return (
    <>
      <span class={`form-radio-label ${errorSuccessClass(props, initialValue)}`}>
        {props.label()}
        {props.required && <span class="text-red-500">*</span>}
      </span>
      <select
        class="form-select"
        {...filteredProps}
      >
        <For each={options()}>
          {option => {
            const value = () => (Array.isArray(props.value) ? props.value[0] : props.value);
            return (
              <option
                selected={value() === option.value}
                value={option.value}
              >
                {option.label}
              </option>
            );
          }}
        </For>
        {hasError(props.error) && (
          <p class="mt-2 text-sm form-element-has-error">{validationErrorToHumanMessage(props.error?.() || "")}</p>
        )}
      </select>
    </>
  );
}
