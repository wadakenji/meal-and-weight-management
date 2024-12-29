'use server';

import { signIn } from '@/usecase/authentication';
import { redirect } from 'next/navigation';

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  // todo validation
  if (typeof email !== 'string' || typeof password !== 'string')
    throw new Error('');

  await signIn(email, password).catch((e) => {
    console.error(e);
    throw new Error('');
  });

  redirect('/');
};
