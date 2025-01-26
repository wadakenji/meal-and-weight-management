import { FC, Suspense } from 'react';
import { NavigationMenu } from '@/app/(authenticated)/_components/header/navigation-menu';
import { getUserCache } from '@/app/_cache/getUser';
import { UsernameText } from '@/app/(authenticated)/_components/header/username-text';

type Props = {
  session: Session;
};

export const Header: FC<Props> = ({ session }) => {
  const userPromise = getUserCache();
  return (
    <header className="fixed top-0 z-header flex h-header-height w-full items-center justify-between bg-primary p-16px text-white">
      <a href="/dashboard">
        {session.userRegistered ? (
          <h1 className="font-title-family text-app-title font-bold">
            <span>ダイエッター</span>
            <Suspense fallback={<span>{session.username}</span>}>
              <UsernameText userPromise={userPromise} />
            </Suspense>
          </h1>
        ) : (
          <span>email: {session.email}</span>
        )}
      </a>
      {session.userRegistered && <NavigationMenu />}
    </header>
  );
};
