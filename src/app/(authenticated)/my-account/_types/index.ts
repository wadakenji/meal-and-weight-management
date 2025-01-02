export type UpdateUserActionState =
  | {
      updatedUser?: never;
      error: string;
    }
  | {
      updatedUser: User;
      error?: never;
    }
  | null;
