import { Err, Ok } from "./result";
import { Validator } from "./validator";

export const number: Validator<number> = {
  validate: (context) => {
    if (typeof context.value === "number") {
      return new Ok(context.value);
    }

    return new Err([{ context, message: "This value is not a number" }]);
  },
};
