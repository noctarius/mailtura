import UiInputField, { UiInputFieldProps } from "./UiInputField.js";
import { combineProps } from "@solid-primitives/props";

export interface UiNumberFieldProps extends UiInputFieldProps {}

export default function UiNumberField(props: UiNumberFieldProps) {
  const childProps = combineProps(props, {
    type: "number",
  });
  return UiInputField(childProps);
}
