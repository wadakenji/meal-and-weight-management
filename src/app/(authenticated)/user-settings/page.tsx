import { FC } from 'react';
import { AuthenticatedTemplate } from '@/components/template/authenticated-template/authenticated-template';
import { getUserCache } from '@/app/_cache/getUser';
import { UserForm } from '@/app/(authenticated)/user-settings/_components/user-form/user-form';

const Page: FC = async () => {
  const user = await getUserCache();
  if (!user) return null;

  return (
    <AuthenticatedTemplate pageTitle="ユーザー設定">
      <UserForm initialUser={user} />
    </AuthenticatedTemplate>
  );
};

export default Page;
