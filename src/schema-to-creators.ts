type SchemaToType<T> = T extends BooleanConstructor
  ? boolean
  : T extends NumberConstructor
  ? number
  : T extends StringConstructor
  ? string
  : T extends new (...args: any[]) => infer R
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : T extends object
  ? { readonly [K in keyof T]: SchemaToType<T[K]> }
  : "Error: Unable to convert schema to type";

type SchemaToCreator<T, P> = P extends void
  ? () => { readonly type: T }
  : (
      _: SchemaToType<P>
    ) => { readonly type: T; readonly payload: SchemaToType<P> };

export type SchemaToCreators<T> = {
  readonly [K in keyof T]: SchemaToCreator<K, T[K]>;
};
