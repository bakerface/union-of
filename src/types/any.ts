import { Ok } from "./result";
import { Validator } from "./validator";

export const any: Validator<unknown> = {
  validate: (context) => {
    return new Ok(context.value);
  },
};
