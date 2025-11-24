import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { StrapiValidationError } from "@/types/strapi/validation-error";

export function displayValidationError<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T, any, T>,
  validation: StrapiValidationError
) {
  validation.details.errors.forEach((item) => {
    const formName = item.path.join("") as Path<T>;
    if (form.getFieldState(formName))
      form.setError(formName, {
        type: "manual",
        message: item.message,
      });
  });
}
