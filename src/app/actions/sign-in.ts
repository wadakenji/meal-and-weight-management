'use server';

import { signIn } from '@/usecase/authentication';
import { redirect } from 'next/navigation';
import { validateAndParseSignInFormData } from '@/helpers/form/sign-in';

export const signInAction = async (formData: FormData) => {
  const parseResult = validateAndParseSignInFormData(formData);

  if (!parseResult) return; // todo error handling

  const { email, password } = parseResult;
  await signIn(email, password).catch((e) => {
    console.error(e);
    throw new Error(''); // todo error handling
  });

  redirect('/');
};
