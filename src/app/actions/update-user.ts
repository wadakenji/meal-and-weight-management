'use server';

import { getUser, updateUser } from '@/usecase/user';
import { USER_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const updateUserAction = async (formData: FormData) => {
  const name = formData.get(USER_FORM_VALUE_NAMES.NAME);
  const password = formData.get(USER_FORM_VALUE_NAMES.PASSWORD);
  const basalMetabolismRate = Number(
    formData.get(USER_FORM_VALUE_NAMES.BASAL_METABOLISM_RATE),
  );
  const energyPerStep = Number(
    formData.get(USER_FORM_VALUE_NAMES.ENERGY_PER_STEP),
  );

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
