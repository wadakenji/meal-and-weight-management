import { Database } from '@/types/supabase';

type UserRow = Database['public']['Tables']['users']['Row'];
type UserProps = Database['public']['Tables']['users']['Insert'];

export const userRowToUser = (
  id: string,
  email: string,
  userRow: UserRow,
): User => {
  return {
    id,
    email,
    name: userRow.name,
    basalMetabolismRate: userRow.basal_metabolism_rate,
    energyPerStep: userRow.energy_per_step,
  };
};

export const userToUserProps = (user: User): UserProps => {
  return {
    id: user.id,
    name: user.name,
    basal_metabolism_rate: user.basalMetabolismRate,
    energy_per_step: user.energyPerStep,
  };
};
