import { FieldSpec } from "./index.js";
import { combineProps, filterProps } from "@solid-primitives/props";
import UiSelectField, { UiSelectFieldProps } from "../components/ui/UiSelectField.js";

export interface UiFormSelectFieldProps extends UiSelectFieldProps {
  spec: () => FieldSpec;
}

export default function UiFormSelectField(props: UiFormSelectFieldProps) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiSelectField(childProps);
}
