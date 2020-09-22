import { creatorsOf } from "./creators-of";
import { CreatorsToType } from "./creators-to-type";
import { SchemaToCreators } from "./schema-to-creators";
import { SchemaToPattern } from "./schema-to-pattern";
import { SchemaToType } from "./schema-to-type";

function caseOf(value: any, pattern: any): any {
  if (typeof pattern === "undefined") {
    return (v: any): any => caseOf(v, value);
  }

  const fn = pattern[value.type];

  if (typeof fn === "function") {
    return fn(value.payload);
  }

  return pattern._(value);
}

export type TypeOf<Union> = CreatorsToType<Omit<Union, "caseOf">>;

export type UnionOf<T> = SchemaToCreators<T> & {
  caseOf<R>(pattern: SchemaToPattern<T, R>): (value: SchemaToType<T>) => R;
  caseOf<R>(value: SchemaToType<T>, pattern: SchemaToPattern<T, R>): R;
};

export function unionOf<Schema>(schema: Schema): UnionOf<Schema> {
  return { ...creatorsOf(schema), caseOf } as UnionOf<Schema>;
}
