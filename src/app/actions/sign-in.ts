'use server';

import { signIn } from '@/usecase/authentication';
import { redirect } from 'next/navigation';
import { validateAndParseSignInFormData } from '@/helpers/form/sign-in';
import { ERROR_MESSAGES } from '@/constants/error-message';

export const signInAction = async (formData: FormData) => {
  const parseResult = validateAndParseSignInFormData(formData);

  if (!parseResult)
    redirect(`/sign-in?error=${encodeURI(ERROR_MESSAGES.SIGN_IN_FAILED)}`);

  const { email, password } = parseResult;
  await signIn(email, password).catch((e) => {
    console.error(e);
    redirect(`/sign-in?error=${encodeURI(ERROR_MESSAGES.SIGN_IN_FAILED)}`);
  });

  redirect('/');
};
