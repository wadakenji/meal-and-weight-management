'use server';

import { getUser } from '@/usecase/user';
import { registerMeal } from '@/usecase/meal';
import { MEAL_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const registerMealAction = async (formData: FormData) => {
  const datetimeString = formData.get(MEAL_FORM_VALUE_NAMES.DATETIME);
  const name = formData.get(MEAL_FORM_VALUE_NAMES.NAME);
  const amountOfEnergy = formData.get(MEAL_FORM_VALUE_NAMES.AMOUNT_OF_ENERGY);
  const amountOfProtein = formData.get(MEAL_FORM_VALUE_NAMES.AMOUNT_OF_PROTEIN);
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
