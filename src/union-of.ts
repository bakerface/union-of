import { creatorsOf } from "./creators-of";
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

export function unionOf<T>(schema: T): SchemaToUnion<T> {
  return { ...creatorsOf(schema), caseOf } as SchemaToUnion<T>;
}
