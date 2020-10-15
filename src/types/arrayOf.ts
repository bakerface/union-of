import { Err, Ok } from "./result";
import { ValidationResult, Validator, ValidationContext } from "./validator";

export function arrayOf<T>(item: Validator<T>): Validator<T[]> {
  return {
    validate: (context: ValidationContext): ValidationResult<T[]> => {
      if (!Array.isArray(context.value)) {
        return new Err([{ context, message: "This value is not an array" }]);
      }

      let arrayResult: ValidationResult<T[]> = new Ok([]);

      for (let i = 0, ii = context.value.length; i < ii; i++) {
        const itemResult = item.validate({
          path: `${context.path}[${i}]`,
          value: context.value[i],
        });

        arrayResult = arrayResult.caseOf({
          Err: (errors) =>
            itemResult.caseOf<ValidationResult<T[]>>({
              Err: (e) => new Err(errors.concat(e)),
              Ok: () => new Err(errors),
            }),
          Ok: (array) =>
            itemResult.caseOf<ValidationResult<T[]>>({
              Err: (e) => new Err(e),
              Ok: (v) => new Ok(array.concat(v)),
            }),
        });
      }

      return arrayResult;
    },
  };
}
