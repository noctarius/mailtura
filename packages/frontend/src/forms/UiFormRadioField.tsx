import UiRadioField, { UiRadioFieldProps } from "../components/ui/UiRadioField.js";
import { combineProps, filterProps } from "@solid-primitives/props";
import { FieldSpec } from "./index.js";

export interface UiFormRadioFieldProps extends UiRadioFieldProps {
  spec: () => FieldSpec;
}

export default function UiFormRadioField(props: UiFormRadioFieldProps) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiRadioField(childProps);
}
