import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { getUser } from '@/usecase/user';
import { Header } from '@/components/header/header';

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await getUser();
  if (!user) redirect('/sign-in');

  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default Layout;
