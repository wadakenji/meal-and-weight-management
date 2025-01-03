import { z } from 'zod';
import { datetimeInputValueToDate, isValidDate } from '@/utils/date';

const mealFormSchema = z.object({
  datetime: z.custom<string>((value: unknown) => {
    if (typeof value !== 'string') return false;
    if (!isValidDate(new Date(value))) return false;
    return true;
  }),
  name: z.string(),
  amountOfEnergy: z.number(),
  amountOfProtein: z.number().nullable(),
});

type ParsedMealFormData = NonNullable<
  ReturnType<(typeof mealFormSchema)['safeParse']>['data']
>;

export const MEAL_FORM_VALUE_NAMES = {
  DATETIME: 'datetime',
  NAME: 'name',
  AMOUNT_OF_ENERGY: 'amount_of_energy',
  AMOUNT_OF_PROTEIN: 'amount_of_protein',
} as const;

export const validateAndParseMealFormData = (
  formData: FormData,
): ParsedMealFormData | false => {
  const datetimeString = formData.get(MEAL_FORM_VALUE_NAMES.DATETIME);
  const name = formData.get(MEAL_FORM_VALUE_NAMES.NAME);
  const amountOfEnergyString = formData.get(
    MEAL_FORM_VALUE_NAMES.AMOUNT_OF_ENERGY,
  );
  const amountOfProteinString = formData.get(
    MEAL_FORM_VALUE_NAMES.AMOUNT_OF_PROTEIN,
  );

  const parseResult = mealFormSchema.safeParse({
    datetime: datetimeString,
    name,
    amountOfEnergy: Number(amountOfEnergyString),
    amountOfProtein:
      amountOfProteinString !== null ? Number(amountOfProteinString) : null,
  });

  if (parseResult.error) return false;
  return parseResult.data;
};

export const parsedMealFormDataToMeal = (
  userId: string,
  parsedFormData: ParsedMealFormData,
): MealToCreate => {
  const { datetime, name, amountOfEnergy, amountOfProtein } = parsedFormData;
  return {
    userId,
    datetime: datetimeInputValueToDate(datetime),
    name,
    amountOfEnergy,
    amountOfProtein,
  };
};
