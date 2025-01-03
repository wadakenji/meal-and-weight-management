import { z } from 'zod';
import { dateInputValueToDate } from '@/utils/date';

const weightFormSchema = z.object({
  date: z.string().date(),
  weight: z.number(),
});

type ParsedWeightFormData = NonNullable<
  ReturnType<(typeof weightFormSchema)['safeParse']>['data']
>;

export const WEIGHT_FORM_VALUE_NAMES = {
  DATE: 'date',
  WEIGHT: 'weight',
} as const;

export const validateAndParseWeightFormData = (
  formData: FormData,
): ParsedWeightFormData | false => {
  const dateString = formData.get(WEIGHT_FORM_VALUE_NAMES.DATE);
  const weight = Number(formData.get(WEIGHT_FORM_VALUE_NAMES.WEIGHT));

  const parseResult = weightFormSchema.safeParse({
    date: dateString,
    weight,
  });

  if (parseResult.error) return false;
  return parseResult.data;
};

export const parsedWeightFormDataToWeightRecord = (
  userId: string,
  parsedFormData: ParsedWeightFormData,
): WeightRecord => {
  const { date, weight } = parsedFormData;
  return { userId, date: dateInputValueToDate(date), weight };
};
