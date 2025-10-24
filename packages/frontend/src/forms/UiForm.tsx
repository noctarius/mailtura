import { FieldPath, FieldValues, ResponseData, SubmitHandler } from "@modular-forms/solid";
import { For, Match, Switch } from "solid-js";
import { FormSpec, FormSubmitHandler } from "./index.js";
import UiFormTextField from "./UiFormTextField.js";
import UiFormPasswordField from "./UiFormPasswordField.js";
import UiFormEmailField from "./UiFormEmailField.js";
import UiFormCheckboxField from "./UiFormCheckboxField.js";

interface UiFormProps<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
> {
  form: () => FormSpec<TFieldValues, TResponseData, TFieldName>;
  onSubmit: FormSubmitHandler<TFieldValues, TResponseData>;
  onCancel: () => void;
}

export function UiForm<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
>(props: UiFormProps<TFieldValues, TResponseData, TFieldName>) {
  const fieldSpecs = () => props.form().fields;
  const Form = props.form().Form;
  const Field = props.form().Field;

  const onSubmit: SubmitHandler<TFieldValues> = async (values: TFieldValues, event) => {
    event.preventDefault();
    try {
      await props.onSubmit(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div class="space-y-4">
          <For each={fieldSpecs()}>
            {fieldSpec => {
              return (
                <div>
                  <Field name={fieldSpec.name}>
                    {(field, props) => {
                      const spec = () => fieldSpec;
                      const error = () => field.error;
                      return (
                        <>
                          <Switch>
                            <Match when={fieldSpec.type === "text"}>
                              <UiFormTextField
                                {...props}
                                label={() => fieldSpec.label}
                                spec={spec}
                                value={field.value as any}
                                error={error}
                              />
                            </Match>
                            <Match when={fieldSpec.type === "password"}>
                              <UiFormPasswordField
                                {...props}
                                label={() => fieldSpec.label}
                                spec={spec}
                                value={field.value as any}
                                error={error}
                              />
                            </Match>
                            <Match when={fieldSpec.type === "email"}>
                              <UiFormEmailField
                                {...props}
                                label={() => fieldSpec.label}
                                spec={spec}
                                value={field.value as any}
                                error={error}
                              />
                            </Match>
                            <Match when={fieldSpec.type === "checkbox"}>
                              <UiFormCheckboxField
                                {...props}
                                label={() => fieldSpec.label}
                                spec={spec}
                                value={field.value as any}
                                options={fieldSpec.options}
                                error={error}
                              />
                            </Match>
                          </Switch>
                        </>
                      );
                    }}
                  </Field>
                </div>
              );
            }}
          </For>
        </div>
      </Form>
    </>
  );
}
