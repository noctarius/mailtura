import { For } from "solid-js";
import { UiInputFieldProps } from "./UiInputField.js";
import { filterProps } from "@solid-primitives/props";

export interface UiRadioFieldProps extends UiInputFieldProps {
  options?: () => { label: string; value: string | number; description?: string }[];
}

export default function UiRadioField(props: UiRadioFieldProps) {
  const hasError = () => props.error && props.error().length > 0;
  const options = () => props.options?.() || [];
  return (
    <>
      <span class={`form-radio-label ${hasError() ? "form-element-has-error" : "form-element-has-success"}`}>
        {props.label()}
      </span>
      <div class="form-radio-group">
        <For each={options()}>
          {option => {
            const value = () => (!Array.isArray(props.value) ? [props.value] : props.value);
            const filteredProps = filterProps(props, key => !["options", "error", "label"].includes(key));
            return (
              <>
                <div class="flex items-center space-x-2">
                  <input
                    {...filteredProps}
                    id={`list-${option.value.toString()}`}
                    type="radio"
                    value={option.value}
                    checked={value().includes(option.value)}
                    class={`form-radio-item ${hasError() ? "form-element-has-error" : "form-element-has-success"}`}
                  />
                  {option.description ? (
                    <div class="ms-2 text-sm">
                      <label
                        for={`list-${option.value}`}
                        class="form-radio-item-label"
                      >
                        {option.label}
                      </label>
                      <p
                        id="helper-radio-text"
                        class="form-radio-item-description"
                      >
                        {option.description}
                      </p>
                    </div>
                  ) : (
                    <label
                      for={`list-${option.value}`}
                      class="ms-2 form-radio-item-label"
                    >
                      {option.label}
                    </label>
                  )}
                </div>
              </>
            );
          }}
        </For>
        {hasError() && <p class="mt-2 text-sm form-element-has-error">{props.error?.()}</p>}
      </div>
    </>
  );
}
