'use server';

import { signOut } from '@/usecase/authentication';
import { redirect } from 'next/navigation';

export const signOutAction = async () => {
  await signOut();
  redirect('/sign-in');
};
