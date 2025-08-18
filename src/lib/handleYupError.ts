import { ValidationError } from "yup";

export function handleYupError(err: unknown) {
  if (err instanceof ValidationError) {
    return { status: 400, body: { errors: err.errors } };
  }
  return { status: 500, body: { error: "خطای ناشناخته" } };
}
