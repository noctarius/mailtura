import { combineProps, filterProps } from "@solid-primitives/props";
import UiEmailField from "../components/ui/UiEmailField.js";
import { UiFormTextFieldProps } from "./UiFormTextField.js";
import { FieldPath, FieldValues, ResponseData } from "@modular-forms/solid";

interface UiFormEmailFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> extends UiFormTextFieldProps<TFieldValues, TResponseData, TFieldName> {}

export default function UiFormEmailField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormEmailFieldProps<TFieldValues, TResponseData, TFieldName>) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiEmailField(childProps);
}
