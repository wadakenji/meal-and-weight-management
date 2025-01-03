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

type WeightRecord = {
  userId: string;
  date: Date;
  weight: number;
};

type StepRecord = {
  userId: string;
  date: Date;
  step: number;
};

type Meal = {
  id: number;
  userId: string;
  datetime: Date;
  name: string;
  amountOfEnergy: number;
  amountOfProtein: number | null;
};

type MealToCreate = Omit<Meal, 'id'>;
