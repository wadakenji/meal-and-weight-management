type Session = {
  userId: string;
  email: string | undefined;
  username: string | undefined;
  userRegistered: boolean | undefined;
};

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

type UserGroup = {
  id: number;
  name: string;
  users: {
    id: string;
    name: string;
  }[];
};

type WeightRecord = {
  userId: string;
  date: string;
  weight: number;
};

type StepRecord = {
  userId: string;
  date: string;
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

type PushSubscriptionType = {
  userId: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};
