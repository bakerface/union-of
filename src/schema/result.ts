export interface ResultPattern<E, O, Return> {
  Err(value: E): Return;
  Ok(value: O): Return;
}

export interface Result<E, O> {
  caseOf<Return>(pattern: ResultPattern<E, O, Return>): Return;
}

export class Err<E, O> implements Result<E, O> {
  constructor(private readonly value: E) {}

  caseOf<Return>(pattern: ResultPattern<E, O, Return>): Return {
    return pattern.Err(this.value);
  }
}

export class Ok<E, O> implements Result<E, O> {
  constructor(private readonly value: O) {}

  caseOf<Return>(pattern: ResultPattern<E, O, Return>): Return {
    return pattern.Ok(this.value);
  }
}
