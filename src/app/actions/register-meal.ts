'use server';

import { getUser } from '@/usecase/user';
import { registerMeal } from '@/usecase/meal';
import {
  parsedMealFormDataToMeal,
  validateAndParseMealFormData,
} from '@/helpers/form/register-meal-form';
import { ERROR_MESSAGES } from '@/constants/error-message';
import { revalidatePath } from 'next/cache';
import { sendNotification } from '@/usecase/push-subscription/send-notification';
import { isToday } from '@/utils/date';
import { TIMEZONE } from '@/constants/timezone';

type ActionState =
  | {
      registeredMeal?: never;
      error: string;
    }
  | {
      registeredMeal: Meal;
      error?: never;
    }
  | null;

export const registerMealAction = async (
  _prevState: ActionState,
  formData: FormData,
) => {
  const user = await getUser();
  if (!user) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };

  const parseResult = validateAndParseMealFormData(formData);
  if (!parseResult) return { error: ERROR_MESSAGES.INVALID_USER_INPUT };

  const mealToRegister = parsedMealFormDataToMeal(user.id, parseResult);

  const registeredMeal = await registerMeal(mealToRegister);

  revalidatePath('/dashboard');

  if (isToday(registeredMeal.datetime, { timezone: TIMEZONE.ASIA_TOKYO }))
    await sendNotification(
      `${user.name}の食事`,
      `${user.name} が ${registeredMeal.name} を食べました。`,
      { path: `/data-view?user-id=${user.id}` },
    );

  return { registeredMeal };
};
