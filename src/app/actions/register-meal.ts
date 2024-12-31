'use server';

import { getUser } from '@/usecase/user';
import { registerMeal } from '@/usecase/meal';

export const registerMealAction = async (formData: FormData) => {
  const datetimeString = formData.get('datetime');
  const name = formData.get('name');
  const amountOfEnergy = formData.get('amount_of_energy');
  const amountOfProtein = formData.get('amount_of_protein');
  const user = await getUser();

  // todo validation
  if (
    !user ||
    typeof datetimeString !== 'string' ||
    typeof name !== 'string' ||
    typeof amountOfEnergy !== 'string'
  )
    throw new Error('');

  await registerMeal({
    userId: user.id,
    datetime: new Date(datetimeString),
    name,
    amountOfEnergy: Number(amountOfEnergy),
    amountOfProtein: amountOfProtein ? Number(amountOfEnergy) : null,
  });
};
