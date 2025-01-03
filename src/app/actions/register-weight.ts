'use server';

import { getUser } from '@/usecase/user';
import { registerWeightRecord } from '@/usecase/weight-record';
import { WEIGHT_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { z } from 'zod';
import { ERROR_MESSAGES } from '@/constants/error-message';
import { dateInputValueToDate } from '@/utils/date';

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

const weightFormSchema = z.object({
  date: z.string().date(),
  weight: z.number(),
});

export const registerWeightAction = async (
  _prevState: ActionState,
  formData: FormData,
) => {
  const dateString = formData.get(WEIGHT_FORM_VALUE_NAMES.DATE);
  const weight = Number(formData.get(WEIGHT_FORM_VALUE_NAMES.WEIGHT));

  const user = await getUser();
  if (!user) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };

  const parseResult = weightFormSchema.safeParse({
    date: dateString,
    weight,
  });

  if (parseResult.error) return { error: ERROR_MESSAGES.INVALID_USER_INPUT };

  const registeredWeightRecord = await registerWeightRecord({
    userId: user.id,
    date: dateInputValueToDate(parseResult.data.date),
    weight: parseResult.data.weight,
  });

  return { registeredWeightRecord };
};
