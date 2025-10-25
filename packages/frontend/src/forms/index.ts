import type { FieldPathValue, FieldType } from "@modular-forms/solid";
import {
  clearError,
  clearResponse,
  createForm,
  FieldPath,
  FieldProps,
  FieldValues,
  FormProps,
  PartialKey,
  PartialValues,
  ResponseData,
  submit,
} from "@modular-forms/solid";
import { JSX } from "solid-js";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  type Static,
  TProperties,
  type TSchema as TypeboxSchema,
} from "typebox";
import typeboxForm from "./typeboxForm.js";
import { IsRequired } from "typebox/schema";

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
  type: "text" | "number" | "email" | "password" | "select" | "checkbox" | "radio" | "textarea" | "file" | "toggle";
  required?: boolean;
  placeholder?: string;
  options?: () => { label: string; value: string }[];
  disabled?: boolean;
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
  formType: FieldType<FieldPathValue<TFieldValues, TFieldPath>>;
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

const resolveFieldType = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>(
  name: TFieldName,
  property: TProperties[TFieldName],
  spec: FieldSpec
): FieldType<FieldPathValue<TFieldValues, TFieldName>> => {
  if (IsString(property)) {
    if (spec.type === "file") {
      return "file" as FieldType<FieldPathValue<TFieldValues, TFieldName>>;
    }
    return "string" as FieldType<FieldPathValue<TFieldValues, TFieldName>>;
  }
  if (IsNumber(property)) {
    return "number" as FieldType<FieldPathValue<TFieldValues, TFieldName>>;
  }
  if (IsBoolean(property)) {
    return "boolean" as FieldType<FieldPathValue<TFieldValues, TFieldName>>;
  }
  if (IsArray(property)) {
    return `${resolveFieldType(name, property.items, spec)}[]` as FieldType<FieldPathValue<TFieldValues, TFieldName>>;
  }
  throw new TypeError(`Schema doesn't contain a property with the name: ${name}`);
};

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
  const [form, { Form, Field }] = createForm<TFieldValues, TResponseData>({
    initialValues,
    validate: typeboxForm(schema),
  });

  const getType = <TFieldPath extends FieldPath<TFieldValues>>(
    name: TFieldPath
  ): FieldType<FieldPathValue<TFieldValues, TFieldPath>> => {
    if (IsObject(schema)) {
      const spec = specs[name];
      const property = schema.properties[name];
      return resolveFieldType(name, property, spec);
    }
    throw new TypeError(`Schema doesn't contain a property with the name: ${name}`);
  };

  const isRequired = <TFieldPath extends FieldPath<TFieldValues>>(name: TFieldPath): boolean => {
    if (IsObject(schema)) {
      const spec = specs[name];
      const property = schema.properties[name];
      if (spec.required) return spec.required;
      if (IsRequired(property)) return true;
      return !IsOptional(property);
    }
    return false;
  };

  const fields = order.map(name => {
    const spec = specs[name];
    const formType = getType(name);
    return {
      ...spec,
      name,
      formType,
      required: isRequired(name),
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

export function hasValue(value: string | string[] | number | undefined): boolean {
  if (value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

export function hasError(error?: () => string): boolean {
  if (error) return !!error();
  return false;
}

export function errorSuccessClass(props: {
  value?: string | string[] | number | undefined;
  error?: () => string;
}): string {
  if (!hasValue(props.value)) return "";
  if (hasError(props.error)) return "text-red-500";
  return "text-green-500";
}
