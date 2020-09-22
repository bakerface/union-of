import { CreatorsToPattern } from "./creators-to-pattern";
import { CreatorsToValue } from "./creators-to-value";
import { SchemaToCreators } from "./schema-to-creators";

export type SchemaToValue<T> = CreatorsToValue<SchemaToCreators<T>>;

type SchemaToCompletePattern<T, R> = CreatorsToPattern<SchemaToCreators<T>, R>;

type SchemaToPartialPattern<T, R> = Partial<SchemaToCompletePattern<T, R>> & {
  readonly _: (value: SchemaToValue<T>) => R;
};

export type SchemaToPattern<T, R> =
  | SchemaToCompletePattern<T, R>
  | SchemaToPartialPattern<T, R>;

export type SchemaToUnion<T> = SchemaToCreators<T> & {
  caseOf<R>(pattern: SchemaToPattern<T, R>): (value: SchemaToValue<T>) => R;
  caseOf<R>(value: SchemaToValue<T>, pattern: SchemaToPattern<T, R>): R;
};
