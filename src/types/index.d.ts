type User = { id: string; email: string } & (
  | {
      name: string;
      basalMetabolismRate: number;
      energyPerStep: number;
    }
  | {
      name?: never;
      basalMetabolismRate?: never;
      energyPerStep?: never;
    }
);
