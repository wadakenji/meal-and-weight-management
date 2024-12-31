'use server';

import { getUser } from '@/usecase/user';
import { registerWeightRecord } from '@/usecase/weight-record';
import { WEIGHT_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const registerWeightAction = async (formData: FormData) => {
  const dateString = formData.get(WEIGHT_FORM_VALUE_NAMES.DATE);
  const weight = formData.get(WEIGHT_FORM_VALUE_NAMES.WEIGHT);
  const user = await getUser();

  // todo validation
  if (!user || typeof dateString !== 'string') throw new Error('');

  await registerWeightRecord({
    userId: user.id,
    date: new Date(dateString),
    weight: Number(weight),
  });
};
