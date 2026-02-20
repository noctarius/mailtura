import {
  clearError,
  clearResponse,
  createForm,
  FieldElementProps,
  FieldPath,
  FieldPathValue,
  FieldProps,
  FieldStore,
  FieldType,
  FieldValues,
  FormProps,
  PartialKey,
  PartialValues,
  ResponseData,
  setValue,
  submit,
} from "@modular-forms/solid";
import { JSX } from "solid-js";
import {
  IsArray,
  IsBoolean,
  IsInteger,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  type Static,
  TProperties,
  type TSchema as TypeboxSchema,
} from "typebox";
import typeboxForm from "./typeboxForm.js";
import { IsAllOf, IsAnyOf, IsRequired } from "typebox/schema";
import { isEqual } from "lodash";

type Form<TFieldValues extends FieldValues, TResponseData extends ResponseData> = (
  props: Omit<FormProps<TFieldValues, TResponseData>, "of">
) => JSX.Element;

type Field<TFieldValues extends FieldValues, TResponseData extends ResponseData> = {
  <TFieldName extends FieldPath<TFieldValues>>(
    props: PartialKey<Omit<FieldProps<TFieldValues, TResponseData, TFieldName>, "of">, "type">
  ): JSX.Element;
};

export interface FieldSpecInfo<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> {
  fieldSpec: FieldSpec<TFieldValues, TResponseData, TFieldName>;
  props: FieldElementProps<TFieldValues, TFieldName>;
  field: FieldStore<TFieldValues, TFieldName>;
}

export interface FieldSpec<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> {
  label: string;
  type: "text" | "number" | "email" | "password" | "select" | "checkbox" | "radio" | "textarea" | "file" | "toggle";
  required?: boolean;
  placeholder?: string;
  options?: () => { label: string; value: string; description?: string }[];
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number | boolean;
  cell?: (info: FieldSpecInfo<TFieldValues, TResponseData, TFieldName>) => JSX.Element;
}

export type FieldSpecs<TFieldValues extends FieldValues, TResponseData extends ResponseData> = Partial<{
  [K in FieldPath<TFieldValues>]: FieldSpec<TFieldValues, TResponseData, K>;
}>;

export type FormFieldSpec<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> = FieldSpec<TFieldValues, TResponseData, TFieldName> & {
  name: TFieldName;
  formType: FieldType<FieldPathValue<TFieldValues, TFieldName>>;
};

export type FormSubmitHandler<TFieldValues extends FieldValues, TResponseData extends ResponseData = undefined> = (
  values: TFieldValues
) => Promise<TResponseData>;

export interface FormSpec<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> {
  fields: FormFieldSpec<TFieldValues, TResponseData, TFieldName>[];
  getField(name: TFieldName): FormFieldSpec<TFieldValues, TResponseData, TFieldName>;
  Form: Form<TFieldValues, TResponseData>;
  Field: Field<TFieldValues, TResponseData>;
  updateField(name: TFieldName, value: any): void;
  submitForm: () => void;
  cancelForm: () => void;
}

const resolveFieldType = <
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(
  name: TFieldName,
  property: TProperties[TFieldName],
  spec: FieldSpec<TFieldValues, TResponseData, TFieldName>
): FieldType<FieldPathValue<TFieldValues, TFieldName>> => {
  if (IsString(property)) {
    if (spec.type === "file") {
      return "file" as FieldType<FieldPathValue<TFieldValues, TFieldName>>;
    }
    return "string" as FieldType<FieldPathValue<TFieldValues, TFieldName>>;
  }
  if (IsNumber(property) || IsInteger(property)) {
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
  specs: FieldSpecs<TFieldValues, TResponseData>,
  order: TFieldName[] = Object.keys(specs) as TFieldName[],
  initialValues?: PartialValues<TFieldValues>
): FormSpec<TFieldValues, TResponseData, TFieldName> {
  const [form, { Form, Field }] = createForm<TFieldValues, TResponseData>({
    initialValues,
    validate: typeboxForm(schema),
  });

  const getType = <TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    useSchema: TypeboxSchema = schema,
    throwOnMissing: boolean = true
  ): FieldType<FieldPathValue<TFieldValues, TFieldName>> | undefined => {
    const spec = specs[name];
    if (!spec) throw new TypeError(`Schema doesn't contain a property with the name: ${name}`);
    if (IsAnyOf(useSchema)) {
      for (const anyOf of useSchema.anyOf) {
        const candidate = getType(name, anyOf, false);
        if (candidate) return candidate;
      }
    } else if (IsAllOf(useSchema)) {
      for (const allOf of useSchema.allOf) {
        const candidate = getType(name, allOf, false);
        if (candidate) return candidate;
      }
    } else if (IsObject(useSchema)) {
      const property = useSchema.properties[name];
      if (property) return resolveFieldType(name, property, spec);
    }
    if (throwOnMissing) throw new TypeError(`Schema doesn't contain a property with the name: ${name}`);
  };

  const isRequired = <TFieldName extends FieldPath<TFieldValues>>(name: TFieldName): boolean => {
    if (IsObject(schema)) {
      const spec = specs[name];
      if (!spec) return false;
      const property = schema.properties[name];
      if (spec.required) return spec.required;
      if (IsRequired(property)) return true;
      return !IsOptional(property);
    }
    return false;
  };

  const fields = order.map(name => {
    const spec = specs[name];
    const formType = getType(name)!;
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
    getField(name: TFieldName) {
      const spec = specs[name];
      if (!spec) throw new TypeError(`Schema doesn't contain a property with the name: ${name}`);
      const formType = getType(name)!;
      return {
        ...spec,
        name,
        formType,
        required: isRequired(name),
      };
    },
    updateField(name: TFieldName, value: any) {
      setValue(form, name, value);
    },
  };
}

export function hasValue<T extends string | string[] | number | undefined>(value: T, initialValue?: T): boolean {
  if (value === undefined) return false;
  if (Array.isArray(value)) {
    if (value.length === 0) return false;
  }
  if (initialValue && isEqual(value, initialValue)) return false;
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return true;
}

export function hasError(error?: () => string): boolean {
  if (error) return !!error();
  return false;
}

export function errorSuccessClass(
  props: {
    value?: string | string[] | number | undefined;
    error?: () => string;
  },
  initialValue?: any
): string {
  if (!hasValue(props.value, initialValue)) return "";
  if (hasError(props.error)) return "text-red-500";
  return "text-green-500";
}
