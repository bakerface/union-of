import { isRecord } from "./isRecord";
import { Err, Ok } from "./result";
import { ValidationResult, Validator, ValidationContext } from "./validator";

export type RecordOf<T> = Record<string, T | undefined>;

export function recordOf<T>(item: Validator<T>): Validator<RecordOf<T>> {
  return {
    validate: (context: ValidationContext): ValidationResult<RecordOf<T>> => {
      if (!isRecord(context.value)) {
        return new Err([{ context, message: "This value is not an object" }]);
      }

      let result: ValidationResult<RecordOf<T>> = new Ok({});

      for (const key in context.value) {
        const itemResult = item.validate({
          path: `${context.path}.${key}`,
          value: context.value[key],
        });

        result = result.caseOf({
          Err: (errors) =>
            itemResult.caseOf<ValidationResult<RecordOf<T>>>({
              Err: (e) => new Err(errors.concat(e)),
              Ok: () => new Err(errors),
            }),
          Ok: (record) =>
            itemResult.caseOf<ValidationResult<RecordOf<T>>>({
              Err: (e) => new Err(e),
              Ok: (value) => new Ok({ ...record, [key]: value }),
            }),
        });
      }

      return result;
    },
  };
}
