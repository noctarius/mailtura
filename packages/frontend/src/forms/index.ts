import {
  clearError,
  clearResponse,
  createForm,
  FieldPath,
  FieldProps,
  FieldValues,
  FormErrors,
  FormProps,
  type MaybePromise,
  PartialKey,
  PartialValues,
  ResponseData,
  submit,
} from "@modular-forms/solid";
import { JSX } from "solid-js";
import { type Static, type TSchema as TypeboxSchema } from "typebox";
import typeboxForm from "./typeboxForm.js";

type Form<TFieldValues extends FieldValues, TResponseData extends ResponseData> = (
  props: Omit<FormProps<TFieldValues, TResponseData>, "of">
) => JSX.Element;

type Field<TFieldValues extends FieldValues, TResponseData extends ResponseData> = {
  <TFieldName extends FieldPath<TFieldValues>>(
    props: PartialKey<Omit<FieldProps<TFieldValues, TResponseData, TFieldName>, "of">, "type">
  ): JSX.Element;
};

export type FieldSpec = {
  label: string;
  type: "text" | "number" | "email" | "password" | "select" | "checkbox" | "radio" | "textarea";
  placeholder?: string;
  options?: () => { label: string; value: string }[];
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
};

export type FieldSpecs<TFieldValues extends FieldValues> = {
  [k in keyof TFieldValues]: FieldSpec;
};

export type FormFieldSpec<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = FieldSpec & {
  name: TFieldPath;
};

export type FormSubmitHandler<TFieldValues extends FieldValues, TResponseData extends ResponseData = undefined> = (
  values: TFieldValues
) => Promise<TResponseData>;

export interface FormSpec<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldPath extends FieldPath<TFieldValues>,
> {
  fields: FormFieldSpec<TFieldValues, TFieldPath>[];
  Form: Form<TFieldValues, TResponseData>;
  Field: Field<TFieldValues, TResponseData>;
  submitForm: () => void;
  cancelForm: () => void;
}

export function createFormSpec<
  TSchema extends TypeboxSchema,
  TFieldValues extends FieldValues = Static<TSchema>,
  TResponseData extends ResponseData = undefined,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  schema: TSchema,
  specs: FieldSpecs<TFieldValues>,
  order: TFieldName[] = Object.keys(specs) as TFieldName[],
  initialValues?: PartialValues<TFieldValues>
): FormSpec<TFieldValues, TResponseData, TFieldName> {
  const validator = typeboxForm(schema)
  const [form, { Form, Field }] = createForm<TFieldValues, TResponseData>({
    initialValues,
    validate: (values: PartialValues<TFieldValues>): MaybePromise<FormErrors<TFieldValues>> => {
      const result = validator(values as any)
      console.log(result)
      return result as any;
    },
  });

  const fields = order.map(fieldName => {
    const spec = specs[fieldName];
    return {
      ...spec,
      name: fieldName,
    };
  });

  return {
    fields,
    Form,
    Field: Field as Field<TFieldValues, TResponseData>,
    submitForm() {
      submit(form);
    },
    cancelForm() {
      for (const fieldName of order) clearError(form, fieldName);
      clearResponse(form);
    },
  };
}
