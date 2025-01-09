type ErrorType = 'AUTH' | 'DB';

class UsecaseError extends Error {
  readonly module: string;
  readonly function: string;
  readonly type: ErrorType;

  constructor(props: { module: string; function: string; type: ErrorType }) {
    super();
    this.module = props.module;
    this.function = props.function;
    this.type = props.type;
  }
}

export class UsecaseAuthError extends UsecaseError {
  constructor(props: { module: string; function: string }) {
    super({ ...props, type: 'AUTH' });
  }
}

export class UsecaseDbError extends UsecaseError {
  constructor(props: { module: string; function: string }) {
    super({ ...props, type: 'DB' });
  }
}
