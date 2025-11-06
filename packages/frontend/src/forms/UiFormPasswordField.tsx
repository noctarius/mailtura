import { combineProps, filterProps } from "@solid-primitives/props";
import UiPasswordField from "../components/ui/UiPasswordField.js";
import { UiFormTextFieldProps } from "./UiFormTextField.js";
import { FieldPath, FieldValues, ResponseData } from "@modular-forms/solid";

interface UiFormPasswordFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> extends UiFormTextFieldProps<TFieldValues, TResponseData, TFieldName> {
  showPassword?: () => boolean;
}

export default function UiFormPasswordField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormPasswordFieldProps<TFieldValues, TResponseData, TFieldName>) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiPasswordField(childProps);
}
