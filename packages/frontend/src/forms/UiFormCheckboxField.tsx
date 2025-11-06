import { combineProps, filterProps } from "@solid-primitives/props";
import UiCheckboxField, { UiCheckboxFieldProps } from "../components/ui/UiCheckboxField.js";
import { FieldSpec } from "./index.js";
import { FieldPath, FieldValues, ResponseData } from "@modular-forms/solid";

export interface UiFormCheckboxFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> extends UiCheckboxFieldProps {
  spec: () => FieldSpec<TFieldValues, TResponseData, TFieldName>;
}

export default function UiFormCheckboxField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormCheckboxFieldProps<TFieldValues, TResponseData, TFieldName>) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiCheckboxField(childProps);
}
