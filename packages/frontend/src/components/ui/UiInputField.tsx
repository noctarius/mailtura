import { JSX } from "solid-js";

export interface UiInputFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: () => string;
  description?: () => string;
  error?: () => string;
}

export default function UiInputField(props: UiInputFieldProps) {
  const hasError = () => props.error && props.error().length > 0;
  const id = () => `id-${props.id || props.name || window.crypto.randomUUID()}`;
  return (
    <>
      <label
        for={id()}
        class={`form-input-label ${hasError() ? "form-element-has-error" : "form-element-has-success"}`}
      >
        {props.label()}
      </label>
      <input
        {...props}
        id={id()}
        class={`form-input ${hasError() ? "form-element-has-error" : "form-element-has-success"}`}
      />
      {props.description && (
        <p
          id={`desc-${id()}`}
          class="form-input-description"
        >
          {props.description()}
        </p>
      )}
      {hasError() && <p class="mt-2 text-sm form-element-has-error">{props.error?.()}</p>}
    </>
  );
}
