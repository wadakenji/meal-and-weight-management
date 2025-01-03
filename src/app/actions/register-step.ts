'use server';

import { getUser } from '@/usecase/user';
import { registerStepRecord } from '@/usecase/step-record';
import {
  parsedStepFormDataToStepRecord,
  validateAndParseStepFormData,
} from '@/helpers/form/register-step-record-form';

export const registerStepAction = async (formData: FormData) => {
  const user = await getUser();
  if (!user) return; // todo error handling

  const parseResult = validateAndParseStepFormData(formData);
  if (!parseResult) return; // todo error handling

  const stepRecordToRegister = parsedStepFormDataToStepRecord(
    user.id,
    parseResult,
  );

  const registeredStepRecord = await registerStepRecord(stepRecordToRegister);
};
