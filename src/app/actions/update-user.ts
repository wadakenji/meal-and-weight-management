'use server';

import { getUser, updateUser } from '@/usecase/user';
import { ERROR_MESSAGES } from '@/constants/error-message';
import {
  parsedUpdateUserFormDataToUser,
  validateAndParseUpdateUserFormData,
} from '@/helpers/form/update-user-form';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type UpdateUserActionState =
  | {
      updatedUser?: never;
      error: string;
    }
  | {
      updatedUser: User;
      error?: never;
    }
  | null;

export const updateUserAction = async (
  _prevState: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> => {
  const user = await getUser();
  if (!user) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };

  const isFirstRegister = user.name === undefined;

  const parseResult = validateAndParseUpdateUserFormData(formData);
  if (!parseResult) return { error: ERROR_MESSAGES.INVALID_USER_INPUT };

  const userToUpdate = parsedUpdateUserFormDataToUser(
    user.id,
    user.email,
    parseResult,
  );

  const updatedUser = await updateUser(userToUpdate, parseResult.password);

  if (isFirstRegister) redirect('/dashboard');

  revalidatePath('/settings');

  return { updatedUser };
};
