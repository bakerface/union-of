export interface ResultPattern<E, O, Return> {
  Err(value: E): Return;
  Ok(value: O): Return;
}

export interface Result<E, O> {
  caseOf<Return>(pattern: ResultPattern<E, O, Return>): Return;
}

export class Err<E, O> implements Result<E, O> {
  constructor(public readonly value: E) {}

  caseOf<Return>(pattern: ResultPattern<E, O, Return>): Return {
    return pattern.Err(this.value);
  }
}

export class Ok<E, O> implements Result<E, O> {
  constructor(public readonly value: O) {}

  caseOf<Return>(pattern: ResultPattern<E, O, Return>): Return {
    return pattern.Ok(this.value);
  }
}

export function isOk<E, O>(result: Result<E, O>): result is Ok<E, O> {
  return result.caseOf<boolean>({
    Ok: () => true,
    Err: () => false,
  });
}

export function isErr<E, O>(result: Result<E, O>): result is Err<E, O> {
  return result.caseOf<boolean>({
    Ok: () => false,
    Err: () => true,
  });
}
