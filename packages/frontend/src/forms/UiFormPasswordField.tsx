import { combineProps, filterProps } from "@solid-primitives/props";
import UiPasswordField from "../components/ui/UiPasswordField.js";
import { UiFormTextFieldProps } from "./UiFormTextField.js";

interface UiFormPasswordFieldProps extends UiFormTextFieldProps {
  showPassword?: () => boolean;
}

export default function UiFormPasswordField(props: UiFormPasswordFieldProps) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiPasswordField(childProps);
}
