import UiInputField, { UiInputFieldProps } from "./UiInputField.js";
import { combineProps } from "@solid-primitives/props";

export interface UiEmailFieldProps extends UiInputFieldProps {}

export default function UiEmailField(props: UiEmailFieldProps) {
  const childProps = combineProps(props, {
    type: "email",
  });
  return UiInputField(childProps);
}
