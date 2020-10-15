import { Ok } from "./result";
import { ValidationResult, Validator, ValidationContext } from "./validator";

export function optional<T>(validator: Validator<T>): Validator<T | undefined> {
  return {
    validate: (context: ValidationContext): ValidationResult<T | undefined> => {
      if (typeof context.value === "undefined") {
        return new Ok(context.value);
      }

      return validator.validate(context);
    },
  };
}
