import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import { getUser } from '@/usecase/user';

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await getUser();
  if (!user) redirect('/sign-in');

  return (
    <>
      <header className="p-8px bg-[#ddeeff]">{user.name ?? user.email}</header>
      {children}
    </>
  );
};

export default Layout;
