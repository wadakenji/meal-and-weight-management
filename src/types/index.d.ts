type User = { id: string; email: string } & (
  | {
      name: string;
    }
  | {
      name?: never;
    }
);
