import { FieldSpec } from "./index.js";
import { combineProps, filterProps } from "@solid-primitives/props";
import UiSelectField, { UiSelectFieldProps } from "../components/ui/UiSelectField.js";
import { FieldPath, FieldValues, ResponseData } from "@modular-forms/solid";

export interface UiFormSelectFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> extends UiSelectFieldProps {
  spec: () => FieldSpec<TFieldValues, TResponseData, TFieldName>;
}

export default function UiFormSelectField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormSelectFieldProps<TFieldValues, TResponseData, TFieldName>) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiSelectField(childProps);
}
