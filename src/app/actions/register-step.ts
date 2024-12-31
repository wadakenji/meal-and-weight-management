'use server';

import { getUser } from '@/usecase/user';
import { registerStepRecord } from '@/usecase/step-record';
import { STEP_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const registerStepAction = async (formData: FormData) => {
  const dateString = formData.get(STEP_FORM_VALUE_NAMES.DATE);
  const step = formData.get(STEP_FORM_VALUE_NAMES.STEP);
  const user = await getUser();

  // todo validation
  if (!user || typeof dateString !== 'string') throw new Error('');

  await registerStepRecord({
    userId: user.id,
    date: new Date(dateString),
    step: Number(step),
  });
};
