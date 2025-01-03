'use server';

import { getUser } from '@/usecase/user';
import { registerMeal } from '@/usecase/meal';
import {
  parsedMealFormDataToMeal,
  validateAndParseMealFormData,
} from '@/helpers/form/register-meal-form';

export const registerMealAction = async (formData: FormData) => {
  const user = await getUser();
  if (!user) return; // todo error handling

  const parseResult = validateAndParseMealFormData(formData);
  if (!parseResult) return; // todo error handling

  const mealToRegister = parsedMealFormDataToMeal(user.id, parseResult);

  const registeredMeal = await registerMeal(mealToRegister);
};
