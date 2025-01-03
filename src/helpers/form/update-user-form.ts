import { z } from 'zod';

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

type ParsedUpdateUserFormData = NonNullable<
  ReturnType<(typeof userFormSchema)['safeParse']>['data']
>;

export const USER_FORM_VALUE_NAMES = {
  NAME: 'name',
  PASSWORD: 'password',
  BASAL_METABOLISM_RATE: 'basal_metabolism_rate',
  ENERGY_PER_STEP: 'energy_per_step',
} as const;

export const validateAndParseUpdateUserFormData = (
  formData: FormData,
): ParsedUpdateUserFormData | false => {
  const name = formData.get(USER_FORM_VALUE_NAMES.NAME);
  const password = formData.get(USER_FORM_VALUE_NAMES.PASSWORD);
  const basalMetabolismRate = Number(
    formData.get(USER_FORM_VALUE_NAMES.BASAL_METABOLISM_RATE),
  );
  const energyPerStep = Number(
    formData.get(USER_FORM_VALUE_NAMES.ENERGY_PER_STEP),
  );

  const parseResult = userFormSchema.safeParse({
    name,
    basalMetabolismRate,
    energyPerStep,
    password: password || null,
  });

  if (parseResult.error) return false;
  return parseResult.data;
};

export const parsedUpdateUserFormDataToUser = (
  id: string,
  email: string,
  parsedFormData: ParsedUpdateUserFormData,
): User => {
  const { name, basalMetabolismRate, energyPerStep } = parsedFormData;
  return { id, email, name, basalMetabolismRate, energyPerStep };
};
