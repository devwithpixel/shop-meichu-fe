export interface StrapiValidationErrorDetail {
  path: string[];
  message: string;
  name: "ValidationError";
}

export interface StrapiValidationError {
  status: 400;
  name: "ValidationError";
  message: string;
  details: {
    errors: StrapiValidationErrorDetail[];
  };
}

export interface StrapiValidationErrorResponse<T = null> {
  data: T;
  error: StrapiValidationError;
}
