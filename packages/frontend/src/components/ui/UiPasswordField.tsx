import UiInputField, { UiInputFieldProps } from "./UiInputField.js";
import { combineProps } from "@solid-primitives/props";

export interface UiPasswordFieldProps extends UiInputFieldProps {
  showPassword?: () => boolean;
}

export default function UiPasswordField(props: UiPasswordFieldProps) {
  const childProps = combineProps(props, {
    type: "password",
  });
  return UiInputField(childProps);
}
