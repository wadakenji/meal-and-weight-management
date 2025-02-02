import { FC, Suspense } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { UserForm } from '@/app/(authenticated)/settings/_components/user-form/user-form';
import { getUser } from '@/usecase/user';
import { IconSpinner } from '@/components/icon/spinner';
import { PushNotificationManager } from '@/app/(authenticated)/settings/_components/push-notification-manager/push-notification-manager';

const Page: FC = async () => {
  const userPromise = getUser();

  return (
    <AuthenticatedTemplate pageTitle="ユーザー設定">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <UserForm userPromise={userPromise} />
      </Suspense>
      <PushNotificationManager />
    </AuthenticatedTemplate>
  );
};

export default Page;
