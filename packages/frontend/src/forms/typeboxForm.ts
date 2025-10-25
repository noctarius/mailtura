import type { MaybePromise } from "@modular-forms/solid";
import { FieldValues, FormErrors, PartialValues, ValidateForm } from "@modular-forms/solid";
import type { Static, TSchema as TypeboxSchema } from "typebox";
import { Compile } from "typebox/compile";

const transformInstancePath = (instancePath: string) => {
  if (instancePath.startsWith('/')) {
    instancePath = instancePath.substring(1);
  }
  return instancePath.replace(/\//g, '.');
}

export default function typeboxForm<TSchema extends TypeboxSchema, TFieldValues extends FieldValues = Static<TSchema>>(
  schema: TSchema
): ValidateForm<TFieldValues> {
  const validator = Compile(schema);

  return (values: PartialValues<TFieldValues>): MaybePromise<FormErrors<TFieldValues>> => {
    const errors = validator.Errors(values)
    if (errors.length === 0) return {};
    return errors.reduce((result, error) => {
      return {
        ...result,
        [transformInstancePath(error.instancePath)]: error.message,
      }
    }, {} as FormErrors<TFieldValues>);
  };
}
