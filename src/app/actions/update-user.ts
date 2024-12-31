'use server';

import { getUser, updateUser } from '@/usecase/user';

export const updateUserAction = async (formData: FormData) => {
  const name = formData.get('name');
  const password = formData.get('password');
  const basalMetabolismRate = Number(formData.get('basal_metabolism_rate'));
  const energyPerStep = Number(formData.get('energy_per_step'));

  const user = await getUser();
  if (!user) throw new Error('');

  // todo validation
  if (typeof name !== 'string' || typeof password !== 'string')
    throw new Error('');

  await updateUser(
    user.id,
    name,
    password || null,
    basalMetabolismRate,
    energyPerStep,
  );
};
