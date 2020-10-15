import { Result } from "./result";

export interface ValidationContext {
  readonly path: string;
  readonly value: unknown;
}

export type ValidationResult<T> = Result<ValidationError[], T>;

export interface ValidationError {
  readonly context: ValidationContext;
  readonly message: string;
}

export interface Validator<T> {
  validate(context: ValidationContext): ValidationResult<T>;
}

export type TypeOf<V> = V extends Validator<infer T>
  ? T
  : "Error: This value is not a validator";
