import { Err, isOk, isErr } from "./result";
import {
  ValidationResult,
  Validator,
  ValidationContext,
  ValidationError,
} from "./validator";

export type OneOf<V> = V extends Validator<infer T>[] ? T : never;

export function oneOf<T extends Validator<any>[]>(
  validators: T
): Validator<OneOf<T>> {
  return {
    validate: (context: ValidationContext): ValidationResult<OneOf<T>> => {
      let errors: ValidationError[] = [];

      for (const validator of validators) {
        const result = validator.validate(context);

        if (isOk(result)) {
          return result;
        }

        if (isErr(result)) {
          errors = errors.concat(result.value);
        }
      }

      return new Err(errors);
    },
  };
}
