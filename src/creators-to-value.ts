type GetReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

type GetReturnTypesOf<T> = {
  readonly [K in keyof T]: GetReturnTypeOf<T[K]>;
};

export type CreatorsToValue<T> = GetReturnTypesOf<T>[keyof T];
