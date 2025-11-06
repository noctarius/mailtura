import { FieldSpec } from "./index.js";
import UiTextField, { UiTextFieldProps } from "../components/ui/UiTextField.js";
import { combineProps, filterProps } from "@solid-primitives/props";
import { FieldPath, FieldValues, ResponseData } from "@modular-forms/solid";

export interface UiFormTextFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> extends UiTextFieldProps {
  spec: () => FieldSpec<TFieldValues, TResponseData, TFieldName>;
}

export default function UiFormTextField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormTextFieldProps<TFieldValues, TResponseData, TFieldName>) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiTextField(childProps);
}
