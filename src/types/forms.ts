/** What a form's server action returns: a general error, per-field errors, and the submitted values. */
export type FormState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};
