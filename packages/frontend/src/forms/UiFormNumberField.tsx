import { FieldSpec } from "./index.js";
import { combineProps, filterProps } from "@solid-primitives/props";
import { FieldPath, FieldValues, ResponseData } from "@modular-forms/solid";
import UiNumberField, { UiNumberFieldProps } from "../components/ui/UiNumberField.js";

export interface UiFormNumberFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> extends UiNumberFieldProps {
  spec: () => FieldSpec<TFieldValues, TResponseData, TFieldName>;
}

export default function UiFormNumberField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormNumberFieldProps<TFieldValues, TResponseData, TFieldName>) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiNumberField(childProps);
}
