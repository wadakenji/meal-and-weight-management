import { FC } from 'react';
import { NavigationMenu } from '@/app/(authenticated)/_components/header/navigation-menu';

type Props = {
  user: User;
};

export const Header: FC<Props> = ({ user }) => {
  return (
    <header className="fixed top-0 flex h-header-height w-full items-center justify-between bg-primary p-16px text-white">
      {user.name ? (
        <h1 className="font-title-family text-app-title font-bold">
          ダイエッター{user.name}
        </h1>
      ) : (
        <span>email: {user.email}</span>
      )}
      {user.name && <NavigationMenu />}
    </header>
  );
};
