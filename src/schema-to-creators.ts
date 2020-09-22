interface Tagged<T, P> {
  readonly type: T;
  readonly payload: P;
}

type SchemaToType<T> = T extends NumberConstructor
  ? number
  : T extends StringConstructor
  ? string
  : T extends BooleanConstructor
  ? boolean
  : T extends DateConstructor
  ? Date
  : T extends object
  ? { readonly [K in keyof T]: SchemaToType<T[K]> }
  : "Error: Unable to convert schema to type";

type SchemaToCreator<T, P> = P extends void
  ? () => Tagged<T, SchemaToType<P>>
  : (payload: SchemaToType<P>) => Tagged<T, SchemaToType<P>>;

export type SchemaToCreators<T> = {
  readonly [K in keyof T]: SchemaToCreator<K, T[K]>;
};
