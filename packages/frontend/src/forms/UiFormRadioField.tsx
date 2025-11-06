import UiRadioField, { UiRadioFieldProps } from "../components/ui/UiRadioField.js";
import { combineProps, filterProps } from "@solid-primitives/props";
import { FieldSpec } from "./index.js";
import { FieldPath, FieldValues, ResponseData } from "@modular-forms/solid";

export interface UiFormRadioFieldProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> extends UiRadioFieldProps {
  spec: () => FieldSpec<TFieldValues, TResponseData, TFieldName>;
}

export default function UiFormRadioField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormRadioFieldProps<TFieldValues, TResponseData, TFieldName>) {
  const label = () => props.spec().label;

  const childProps = combineProps(
    filterProps(props, key => key !== "spec"),
    {
      label,
    }
  );

  return UiRadioField(childProps);
}
