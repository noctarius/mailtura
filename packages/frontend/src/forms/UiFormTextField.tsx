import { FieldSpec } from "./index.js";
import UiTextField, { UiTextFieldProps } from "../components/ui/UiTextField.js";
import { combineProps, filterProps } from "@solid-primitives/props";

export interface UiFormTextFieldProps extends UiTextFieldProps {
  spec: () => FieldSpec;
}

export default function UiFormTextField(props: UiFormTextFieldProps) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiTextField(childProps);
}
