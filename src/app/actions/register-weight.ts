'use server';

import { getUser } from '@/usecase/user';
import { registerWeightRecord } from '@/usecase/weight-record';
import { ERROR_MESSAGES } from '@/constants/error-message';
import {
  parsedWeightFormDataToWeightRecord,
  validateAndParseWeightFormData,
} from '@/helpers/form/register-weight-record-form';
import { revalidatePath } from 'next/cache';

type ActionState =
  | {
      registeredWeightRecord?: never;
      error: string;
    }
  | {
      registeredWeightRecord: WeightRecord;
      error?: never;
    }
  | null;

export const registerWeightAction = async (
  _prevState: ActionState,
  formData: FormData,
) => {
  const user = await getUser();
  if (!user) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };

  const parseResult = validateAndParseWeightFormData(formData);
  if (!parseResult) return { error: ERROR_MESSAGES.INVALID_USER_INPUT };

  const weightRecordToRegister = parsedWeightFormDataToWeightRecord(
    user.id,
    parseResult,
  );

  const registeredWeightRecord = await registerWeightRecord(
    weightRecordToRegister,
  );

  revalidatePath('/dashboard');

  return { registeredWeightRecord };
};
