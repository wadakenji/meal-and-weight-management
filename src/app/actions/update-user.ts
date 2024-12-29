'use server';

import { getUser, updateUser } from '@/usecase/user';

export const updateUserAction = async (formData: FormData) => {
  const name = formData.get('name');
  const password = formData.get('password');

  const user = await getUser();
  if (!user) throw new Error('');

  // todo validation
  if (typeof name !== 'string' || typeof password !== 'string')
    throw new Error('');

  await updateUser(user.id, name, password || null);
};
