import { Err, Ok } from "./result";
import { Validator } from "./validator";

export function func<Return>(ret: Validator<Return>): Validator<() => Return>;
export function func<A, Return>(
  a: Validator<A>,
  ret: Validator<Return>
): Validator<(arg: A) => Return>;
export function func(
  ..._: unknown[]
): Validator<(...args: unknown[]) => unknown> {
  return {
    validate: (context) => {
      if (typeof context.value === "function") {
        return new Ok(context.value);
      }

      return new Err([{ context, message: "This value is not a function" }]);
    },
  };
}
