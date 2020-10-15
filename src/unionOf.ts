import { Shape, Validator, TypeOf, constant, shapeOf, oneOf } from "./types";

export type Action<T, P = undefined> = P extends undefined
  ? { readonly type: T }
  : { readonly type: T; readonly payload: P };

export type Creator<T, P> = P extends undefined
  ? () => Action<T>
  : (payload: P) => Action<T, P>;

export type CreatorsOf<T> = {
  readonly [K in keyof T]: Creator<K, TypeOf<T[K]>>;
};

export type ActionsOf<T> = {
  readonly [K in keyof T]: Action<K, TypeOf<T[K]>>;
};

export type ActionOf<T> = ActionsOf<T>[keyof T];

export type PatternOf<T, Return> = {
  readonly [K in keyof T]: (payload: TypeOf<T[K]>) => Return;
};

export interface CaseOf<T> {
  caseOf<Return>(action: ActionOf<T>, pattern: PatternOf<T, Return>): Return;
}

export type UnionOf<T extends Shape> = Validator<ActionOf<T>> &
  CreatorsOf<T> &
  CaseOf<T>;

function action(type: string): Creator<string, unknown> {
  return (payload): Action<string, unknown> => ({ type, payload });
}

function caseOf(
  action: Action<string, unknown>,
  pattern: Record<string, (payload: unknown) => unknown>
): unknown {
  const fn = pattern[action.type];
  return fn.call(pattern, action.payload);
}

export function unionOf<T extends Shape>(shape: T): UnionOf<T> {
  const actions: any[] = [];

  for (const type in shape) {
    actions.push(
      shapeOf({
        type: constant(type),
        payload: shape[type],
      })
    );
  }

  const union: any = oneOf(actions);

  for (const type in shape) {
    union[type] = action(type);
  }

  union.caseOf = caseOf;

  return union;
}
