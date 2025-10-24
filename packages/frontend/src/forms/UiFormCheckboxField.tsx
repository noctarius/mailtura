import { combineProps, filterProps } from "@solid-primitives/props";
import UiCheckboxField, { UiCheckboxFieldProps } from "../components/ui/UiCheckboxField.js";
import { FieldSpec } from "./index.js";

export interface UiFormCheckboxFieldProps extends UiCheckboxFieldProps {
  spec: () => FieldSpec;
}

export default function UiFormCheckboxField(props: UiFormCheckboxFieldProps) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiCheckboxField(childProps);
}
