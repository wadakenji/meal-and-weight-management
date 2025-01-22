'use server';

import { getUser } from '@/usecase/user';
import { registerStepRecord } from '@/usecase/step-record';
import {
  parsedStepFormDataToStepRecord,
  validateAndParseStepFormData,
} from '@/helpers/form/register-step-record-form';
import { ERROR_MESSAGES } from '@/constants/error-message';
import { revalidatePath } from 'next/cache';

type ActionState =
  | {
      registeredStepRecord?: never;
      error: string;
    }
  | {
      registeredStepRecord: StepRecord;
      error?: never;
    }
  | null;

export const registerStepAction = async (
  _prevState: ActionState,
  formData: FormData,
) => {
  const user = await getUser();
  if (!user) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };

  const parseResult = validateAndParseStepFormData(formData);
  if (!parseResult) return { error: ERROR_MESSAGES.INVALID_USER_INPUT };

  const stepRecordToRegister = parsedStepFormDataToStepRecord(
    user.id,
    parseResult,
  );

  const registeredStepRecord = await registerStepRecord(stepRecordToRegister);

  revalidatePath('/dashboard');

  return { registeredStepRecord };
};
