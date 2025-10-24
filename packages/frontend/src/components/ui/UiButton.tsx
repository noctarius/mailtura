import { UiSpinner } from "./UiSpinner.js";

interface UiButtonProps {
  primary?: boolean;
  text: string;
  loading?: () => boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const baseClasses =
  "text-center hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-800 focus:outline-none focus:ring-blue-300";
const primaryClasses = "text-white bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700";
const secondaryClasses =
  "text-blue-700 hover:text-white border border-blue-700 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500";

export function UiButton(props: UiButtonProps) {
  const isPrimary = () => (props.primary !== undefined ? props.primary : true);
  const isLoading = () => (props.loading ? props.loading() : false);
  const isDisabled = () => props.disabled || isLoading() || false;
  return (
    <button
      disabled={isDisabled()}
      class={`${baseClasses} ${isPrimary() ? primaryClasses : secondaryClasses}`}
      onClick={props.onClick}
    >
      {isLoading() && <UiSpinner primary={isPrimary()} />}
      {props.text}
    </button>
  );
}
