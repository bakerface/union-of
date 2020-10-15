import { isRecord } from "./isRecord";
import { Err, Ok } from "./result";
import {
  ValidationResult,
  Validator,
  ValidationContext,
  TypeOf,
} from "./validator";

export type Shape = Record<string, Validator<any>>;

export type ShapeToType<Shape> = {
  readonly [Key in keyof Shape]: TypeOf<Shape[Key]>;
};

export function shape<T extends Shape>(shape: T): Validator<ShapeToType<T>> {
  return {
    validate: (
      context: ValidationContext
    ): ValidationResult<ShapeToType<T>> => {
      if (!isRecord(context.value)) {
        return new Err([{ context, message: "This value is not an object" }]);
      }

      let result: ValidationResult<ShapeToType<T>> = new Ok({});

      for (const key in shape) {
        const itemResult = shape[key].validate({
          path: `${context.path}.${key}`,
          value: context.value[key],
        });

        result = result.caseOf({
          Err: (errors) =>
            itemResult.caseOf<ValidationResult<ShapeToType<T>>>({
              Err: (e) => new Err(errors.concat(e)),
              Ok: () => new Err(errors),
            }),
          Ok: (record) =>
            itemResult.caseOf<ValidationResult<ShapeToType<T>>>({
              Err: (e) => new Err(e),
              Ok: (value) => new Ok({ ...record, [key]: value }),
            }),
        });
      }

      return result;
    },
  };
}
