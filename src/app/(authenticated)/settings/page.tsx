import { FC, Suspense } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { UserForm } from '@/app/(authenticated)/settings/_components/user-form/user-form';
import { getUser } from '@/usecase/user';
import { IconSpinner } from '@/components/icon/spinner';
import { PushNotificationManager } from '@/app/(authenticated)/settings/_components/push-notification-manager/push-notification-manager';
import { getPushSubscription } from '@/usecase/push-subscription/get-subscriptions';

const Page: FC = async () => {
  const userPromise = getUser();
  const pushSubscriptionPromise = getPushSubscription();

  return (
    <AuthenticatedTemplate pageTitle="設定">
      <div className="mb-24px">
        <h3 className="mb-8px text-lg font-bold">ユーザー設定</h3>
        <Suspense fallback={<IconSpinner mxAuto />}>
          <UserForm userPromise={userPromise} />
        </Suspense>
      </div>
      <div>
        <h3 className="mb-8px text-lg font-bold">プッシュ通知設定</h3>
        <Suspense fallback={<IconSpinner mxAuto />}>
          <PushNotificationManager
            pushSubscriptionPromise={pushSubscriptionPromise}
          />
        </Suspense>
      </div>
    </AuthenticatedTemplate>
  );
};

export default Page;
