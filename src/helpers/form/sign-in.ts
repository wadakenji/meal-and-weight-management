import { z } from 'zod';

const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type ParsedSignInData = NonNullable<
  ReturnType<(typeof signInFormSchema)['safeParse']>['data']
>;

export const SIGN_IN_FORM_VALUE_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

export const validateAndParseSignInFormData = (
  formData: FormData,
): ParsedSignInData | false => {
  const email = formData.get(SIGN_IN_FORM_VALUE_NAMES.EMAIL);
  const password = formData.get(SIGN_IN_FORM_VALUE_NAMES.PASSWORD);

  const parseResult = signInFormSchema.safeParse({
    email,
    password,
  });

  if (parseResult.error) return false;
  return parseResult.data;
};
