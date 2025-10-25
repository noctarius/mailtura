import { JSX } from "solid-js";

export interface UiInputFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: () => string;
  error?: () => string;
}

export default function UiInputField(props: UiInputFieldProps) {
  const hasError = () => props.error && props.error().length > 0;
  return (
    <>
      <label class={`block text-sm font-medium text-gray-700 mb-2 ${hasError() ? "text-red-900 " : "text-green-900"}`}>
        {props.label()}
      </label>
      <input
        {...props}
        class={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${hasError() ? "text-red-900 " : "text-green-900"}`}
      />
      {hasError() && <p class="mt-2 text-sm text-red-600">{props.error?.()}</p>}
    </>
  );
}
