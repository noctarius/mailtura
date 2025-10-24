import { combineProps, filterProps } from "@solid-primitives/props";
import UiEmailField from "../components/ui/UiEmailField.js";
import { UiFormTextFieldProps } from "./UiFormTextField.js";

interface UiFormEmailFieldProps extends UiFormTextFieldProps {}

export default function UiFormEmailField(props: UiFormEmailFieldProps) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiEmailField(childProps);
}
