import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { Header } from '@/app/(authenticated)/_components/header/header';
import { getSession } from '@/usecase/authentication';

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();
  if (!session) redirect('/sign-in');

  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
};

export default Layout;
