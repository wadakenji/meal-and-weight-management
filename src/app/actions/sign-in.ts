'use server';

import { signIn } from '@/usecase/authentication';
import { redirect } from 'next/navigation';
import { SIGN_IN_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const signInAction = async (formData: FormData) => {
  const email = formData.get(SIGN_IN_FORM_VALUE_NAMES.EMAIL);
  const password = formData.get(SIGN_IN_FORM_VALUE_NAMES.PASSWORD);

  // todo validation
  if (typeof email !== 'string' || typeof password !== 'string')
    throw new Error('');

  await signIn(email, password).catch((e) => {
    console.error(e);
    throw new Error('');
  });

  redirect('/');
};
