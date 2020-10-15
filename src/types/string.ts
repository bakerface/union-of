import { Err, Ok } from "./result";
import { Validator } from "./validator";

export const string: Validator<string> = {
  validate: (context) => {
    if (typeof context.value === "string") {
      return new Ok(context.value);
    }

    return new Err([{ context, message: "This value is not a string" }]);
  },
};
