'use server';

import { getUser } from '@/usecase/user';
import { registerStepRecord } from '@/usecase/step-record';

export const registerStepAction = async (formData: FormData) => {
  const dateString = formData.get('date');
  const step = formData.get('step');
  const user = await getUser();

  // todo validation
  if (!user || typeof dateString !== 'string') throw new Error('');

  await registerStepRecord({
    userId: user.id,
    date: new Date(dateString),
    step: Number(step),
  });
};
