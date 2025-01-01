import { FC } from 'react';
import { getUser } from '@/usecase/user';
import { redirect } from 'next/navigation';

const Page: FC = async () => {
  const user = await getUser();

  if (user) redirect('/register');
  else redirect('/sign-in');
};

export default Page;
