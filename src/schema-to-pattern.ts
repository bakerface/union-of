import { CreatorsToPattern } from "./creators-to-pattern";
import { SchemaToCreators } from "./schema-to-creators";
import { SchemaToType } from "./schema-to-type";

type SchemaToCompletePattern<T, R> = CreatorsToPattern<SchemaToCreators<T>, R>;

type SchemaToPartialPattern<T, R> = Partial<SchemaToCompletePattern<T, R>> & {
  readonly _: (value: SchemaToType<T>) => R;
};

export type SchemaToPattern<T, R> =
  | SchemaToCompletePattern<T, R>
  | SchemaToPartialPattern<T, R>;
