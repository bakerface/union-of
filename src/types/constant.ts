import { Err, Ok } from "./result";
import { ValidationResult, Validator, ValidationContext } from "./validator";

export function constant<
  T extends number | string | boolean | null | undefined
>(value: T): Validator<T> {
  return {
    validate: (context: ValidationContext): ValidationResult<T> => {
      if (context.value === value) {
        return new Ok(value);
      }

      return new Err([
        {
          context,
          message: `Expected the value to be ${JSON.stringify(value)}`,
        },
      ]);
    },
  };
}
