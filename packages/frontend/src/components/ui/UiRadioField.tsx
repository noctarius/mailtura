import { For } from "solid-js";
import { UiInputFieldProps } from "./UiInputField.js";
import { filterProps } from "@solid-primitives/props";
import { validationErrorToHumanMessage } from "../../helpers/error-to-human-message.js";
import { errorSuccessClass, hasError } from "../../forms/index.js";

export interface UiRadioFieldProps extends UiInputFieldProps {
  options?: () => { label: string; value: string | number; description?: string }[];
}

export default function UiRadioField(props: UiRadioFieldProps) {
  const options = () => props.options?.() || [];
  return (
    <>
      <span class={`form-radio-label ${errorSuccessClass(props)}`}>{props.label()}</span>
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
                    class={`form-radio-item ${errorSuccessClass(props)}`}
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
        {hasError(props.error) && (
          <p class="mt-2 text-sm form-element-has-error">{validationErrorToHumanMessage(props.error?.() || "")}</p>
        )}
      </div>
    </>
  );
}
