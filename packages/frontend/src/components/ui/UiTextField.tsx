import UiInputField, { UiInputFieldProps } from "./UiInputField.js";
import { combineProps } from "@solid-primitives/props";

export interface UiTextFieldProps extends UiInputFieldProps {}

export default function UiTextField(props: UiTextFieldProps) {
  const childProps = combineProps(props, {
    type: "text",
  });
  return UiInputField(childProps);
}
