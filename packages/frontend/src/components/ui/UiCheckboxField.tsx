import { For } from "solid-js";
import { UiInputFieldProps } from "./UiInputField.js";
import { filterProps } from "@solid-primitives/props";
import { validationErrorToHumanMessage } from "../../helpers/error-to-human-message.js";
import { errorSuccessClass } from "../../forms/index.js";

export interface UiCheckboxFieldProps extends UiInputFieldProps {
  options?: () => { label: string; value: string | number; description?: string }[];
  toggle?: () => boolean;
}

export default function UiCheckboxField(props: UiCheckboxFieldProps) {
  const hasError = () => (props.value && props.error && props.error().length > 0) || false;
  const options = () => props.options?.() || [];
  return (
    <>
      <span class={`form-checkbox-toggle-label ${errorSuccessClass(props)}`}>
        {props.label()}
        {props.required && <span class="text-red-500">*</span>}
      </span>
      <div class={`form-checkbox-toggle-group ${errorSuccessClass(props)}`}>
        <For each={options()}>
          {option => {
            const value = () => (!Array.isArray(props.value) ? [props.value] : props.value);
            const filteredProps = filterProps(props, key => !["options", "error", "label"].includes(key));
            const classes = props.toggle && props.toggle() ? "sr-only peer" : "form-checkbox";
            return props.toggle && props.toggle() ? (
              <>
                <div class="flex items-center space-x-2">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      {...filteredProps}
                      id={`list-${option.value.toString()}`}
                      type="checkbox"
                      value={option.value}
                      checked={value().includes(option.value)}
                      class={classes}
                    />
                    <div class="form-toggle peer"></div>
                    {renderLabel(option)}
                  </label>
                </div>
              </>
            ) : (
              <>
                <div class="flex items-center space-x-2">
                  <input
                    {...filteredProps}
                    id={`list-${option.value.toString()}`}
                    type="checkbox"
                    value={option.value}
                    checked={value().includes(option.value)}
                    class={`${classes} ${errorSuccessClass(props)}`}
                  />
                  {renderLabel(option)}
                </div>
              </>
            );
          }}
        </For>
      </div>
      {hasError() && (
        <p class="mt-2 text-sm form-element-has-error">{validationErrorToHumanMessage(props.error?.() || "")}</p>
      )}
    </>
  );
}

function renderLabel(option: { label: string; value: string | number; description?: string }) {
  return option.description ? (
    <div class="ms-2 text-sm">
      <label
        for={`list-${option.value}`}
        class="form-checkbox-toggle-item-label"
      >
        {option.label}
        {option.value === "all" && <span class="text-gray-400 ml-1">(automatic)</span>}
      </label>
      <p
        id={`list-desc-${option.value}`}
        class="form-checkbox-toggle-item-description"
      >
        {option.description}
      </p>
    </div>
  ) : (
    <label
      for={`list-${option.value}`}
      class="ms-2 form-checkbox-toggle-item-label"
    >
      {option.label}
      {option.value === "all" && <span class="text-gray-400 ml-1">(automatic)</span>}
    </label>
  );
}
