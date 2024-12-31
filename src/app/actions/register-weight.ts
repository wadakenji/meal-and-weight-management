'use server';

import { getUser } from '@/usecase/user';
import { registerWeightRecord } from '@/usecase/weight-record';

export const registerWeightAction = async (formData: FormData) => {
  const dateString = formData.get('date');
  const weight = formData.get('weight');
  const user = await getUser();

  // todo validation
  if (!user || typeof dateString !== 'string') throw new Error('');

  await registerWeightRecord({
    userId: user.id,
    date: new Date(dateString),
    weight: Number(weight),
  });
};
