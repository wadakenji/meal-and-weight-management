'use server';

import { signIn } from '@/usecase/authentication';
import { redirect } from 'next/navigation';

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  await signIn(email, password).catch((e) => {
    console.error(e);
    throw new Error('');
  });

  redirect('/');
};
