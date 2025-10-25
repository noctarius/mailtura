import { UiSpinner } from "./UiSpinner.js";

interface UiButtonProps {
  primary?: boolean;
  text: string;
  loading?: () => boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function UiButton(props: UiButtonProps) {
  const isPrimary = () => (props.primary !== undefined ? props.primary : true);
  const isLoading = () => (props.loading ? props.loading() : false);
  const isDisabled = () => props.disabled || isLoading() || false;
  return (
    <button
      disabled={isDisabled()}
      class={`ui-btn ${isPrimary() ? "ui-btn-primary" : "ui-btn-secondary"}`}
      onClick={props.onClick}
    >
      {isLoading() && <UiSpinner primary={isPrimary()} />}
      {props.text}
    </button>
  );
}
