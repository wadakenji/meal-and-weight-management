import { z } from 'zod';
import { dateInputValueToDate } from '@/utils/date';

const stepFormSchema = z.object({
  date: z.string().date(),
  step: z.number(),
});

type ParsedStepFormData = NonNullable<
  ReturnType<(typeof stepFormSchema)['safeParse']>['data']
>;

export const STEP_FORM_VALUE_NAMES = {
  DATE: 'date',
  STEP: 'step',
} as const;

export const validateAndParseStepFormData = (
  formData: FormData,
): ParsedStepFormData | false => {
  const dateString = formData.get(STEP_FORM_VALUE_NAMES.DATE);
  const step = Number(formData.get(STEP_FORM_VALUE_NAMES.STEP));

  const parseResult = stepFormSchema.safeParse({
    date: dateString,
    step,
  });

  if (parseResult.error) return false;
  return parseResult.data;
};

export const parsedStepFormDataToStepRecord = (
  userId: string,
  parsedFormData: ParsedStepFormData,
): StepRecord => {
  const { date, step } = parsedFormData;
  return { userId, date: dateInputValueToDate(date), step };
};
