type SetReturnTypeOf<T, R> = T extends (...args: infer Args) => any
  ? (...args: Args) => R
  : never;

type SetReturnTypesOf<T, R> = {
  readonly [K in keyof T]: SetReturnTypeOf<T[K], R>;
};

export type CreatorsToPattern<T, R> = SetReturnTypesOf<T, R>;
