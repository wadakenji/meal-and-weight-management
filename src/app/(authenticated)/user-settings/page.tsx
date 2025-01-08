import { FC, Suspense } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { UserForm } from '@/app/(authenticated)/user-settings/_components/user-form/user-form';
import { getUser } from '@/usecase/user';
import { IconSpinner } from '@/components/icon/spinner';

const Page: FC = async () => {
  const userPromise = getUser();

  return (
    <AuthenticatedTemplate pageTitle="ユーザー設定">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <UserForm initialUserPromise={userPromise} />
      </Suspense>
    </AuthenticatedTemplate>
  );
};

export default Page;
