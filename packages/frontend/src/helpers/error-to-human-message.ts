const validationErrorMessages: { [key: string]: string | undefined } = {
  'must match format "email"': "Please enter a valid email address",
  "must not have fewer than 1 items": "Please select at least one option",
};

export function validationErrorToHumanMessage(error: string) {
  const message = validationErrorMessages[error];
  return message || error;
}
