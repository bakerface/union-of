import { Err, Ok } from "./result";
import { Validator } from "./validator";

export const boolean: Validator<boolean> = {
  validate: (context) => {
    if (typeof context.value === "boolean") {
      return new Ok(context.value);
    }

    return new Err([{ context, message: "This value is not a boolean" }]);
  },
};
