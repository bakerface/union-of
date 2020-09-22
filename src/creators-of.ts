import { SchemaToCreators } from "./schema-to-creators";

export function creatorsOf<T>(schema: T): SchemaToCreators<T> {
  const creators: Record<string, Function> = {};

  for (const type in schema) {
    creators[type] = (payload: unknown): unknown => ({ type, payload });
  }

  return creators as SchemaToCreators<T>;
}
