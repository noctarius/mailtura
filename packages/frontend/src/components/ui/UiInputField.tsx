import { JSX } from "solid-js";
import { validationErrorToHumanMessage } from "../../helpers/error-to-human-message.js";
import { filterProps } from "@solid-primitives/props";
import { errorSuccessClass } from "../../forms/index.js";

export interface UiInputFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: () => string;
  description?: () => string;
  error?: () => string;
}

export default function UiInputField(props: UiInputFieldProps) {
  const hasError = () => (props.value && props.error && props.error().length > 0) || false;
  const id = () => `id-${props.id || props.name || window.crypto.randomUUID()}`;
  const filteredProps = filterProps(props, key => !["options", "error", "label"].includes(key));
  return (
    <>
      <label
        for={id()}
        class={`form-input-label ${errorSuccessClass(props)}`}
      >
        {props.label()}
      </label>
      <input
        {...filteredProps}
        id={id()}
        class={`form-input ${errorSuccessClass(props)}`}
      />
      {props.description && (
        <p
          id={`desc-${id()}`}
          class="form-input-description"
        >
          {props.description()}
        </p>
      )}
      {hasError() && (
        <p class="mt-2 text-sm form-element-has-error">{validationErrorToHumanMessage(props.error?.() || "")}</p>
      )}
    </>
  );
}
