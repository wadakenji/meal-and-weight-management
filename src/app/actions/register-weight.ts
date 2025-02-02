'use server';

import { getUser } from '@/usecase/user';
import { registerWeightRecord } from '@/usecase/weight-record';
import { ERROR_MESSAGES } from '@/constants/error-message';
import {
  parsedWeightFormDataToWeightRecord,
  validateAndParseWeightFormData,
} from '@/helpers/form/register-weight-record-form';
import { revalidatePath } from 'next/cache';
import { dateStringToDate, isToday } from '@/utils/date';
import { TIMEZONE } from '@/constants/timezone';
import { sendNotification } from '@/usecase/push-subscription/send-notification';

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

  const date = dateStringToDate(registeredWeightRecord.date, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  if (isToday(date, { timezone: TIMEZONE.ASIA_TOKYO }))
    await sendNotification(
      `${user.name}の体重`,
      `${user.name} の今日の体重は ${registeredWeightRecord.weight}kg です。`,
    );

  return { registeredWeightRecord };
};
