import { creatorsOf } from "./creators-of";
import { CreatorsToValue } from "./creators-to-value";
import { SchemaToUnion } from "./schema-to-union";

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

export type TypeOf<Union> = CreatorsToValue<Omit<Union, "caseOf">>;

export function unionOf<Schema>(schema: Schema): SchemaToUnion<Schema> {
  return { ...creatorsOf(schema), caseOf } as SchemaToUnion<Schema>;
}
