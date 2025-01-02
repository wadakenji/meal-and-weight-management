import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { Header } from '@/app/(authenticated)/_components/header/header';
import { getUserCache } from '@/app/_cache/getUser';

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await getUserCache();
  if (!user) redirect('/sign-in');

  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default Layout;
