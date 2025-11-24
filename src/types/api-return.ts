import type { StrapiValidationError } from "./strapi/validation-error";

interface SuccessResult<T> {
  type: "success";
  data: T;
}

interface ValidationResult {
  type: "validation";
  validation: StrapiValidationError;
}

interface ErrorResult {
  type: "error";
  message: string;
}

export type ResultContract<T> =
  | SuccessResult<T>
  | ValidationResult
  | ErrorResult;
