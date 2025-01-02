'use server';

import { getUser, updateUser } from '@/usecase/user';
import { USER_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { z } from 'zod';
import { UpdateUserActionState } from '@/app/(authenticated)/user-settings/_types';
import { ERROR_MESSAGES } from '@/constants/error-message';

const userFormSchema = z.object({
  name: z.string(),
  basalMetabolismRate: z.number(),
  energyPerStep: z.number(),
  password: z
    .string()
    .min(8)
    .regex(/^[a-zA-Z0-9]*$/)
    .nullable(),
});

export const updateUserAction = async (
  _prevState: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> => {
  const name = formData.get(USER_FORM_VALUE_NAMES.NAME);
  const password = formData.get(USER_FORM_VALUE_NAMES.PASSWORD);
  const basalMetabolismRate = Number(
    formData.get(USER_FORM_VALUE_NAMES.BASAL_METABOLISM_RATE),
  );
  const energyPerStep = Number(
    formData.get(USER_FORM_VALUE_NAMES.ENERGY_PER_STEP),
  );

  const user = await getUser();
  if (!user) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };

  const parseResult = userFormSchema.safeParse({
    name,
    basalMetabolismRate,
    energyPerStep,
    password: password || null,
  });

  if (parseResult.error) return { error: ERROR_MESSAGES.INVALID_USER_INPUT };

  await updateUser(user.id, parseResult.data);
  const updatedUser = await getUser();
  if (!updatedUser) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };
  return { updatedUser };
};
