'use client';

import {
  FC,
  startTransition,
  use,
  useEffect,
  useOptimistic,
  useState,
} from 'react';
import { urlBase64ToUint8Array } from '@/utils/others';
import {
  subscribeUser,
  unsubscribeUser,
} from '@/app/actions/push-notification';
import { ENV } from '@/constants/env';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';
import { IconSpinner } from '@/components/icon/spinner';

type Props = {
  pushSubscriptionPromise: Promise<PushSubscriptionType | null>;
};

export const PushNotificationManager: FC<Props> = ({
  pushSubscriptionPromise,
}) => {
  const pushSubscription = use(pushSubscriptionPromise);
  const [isSubscribed, setOptimisticIsSubscribed] = useOptimistic<
    boolean,
    boolean
  >(!!pushSubscription, (_, optimisticValue) => optimisticValue);

  const [isSupported, setIsSupported] = useState<boolean | undefined>(
    undefined,
  );
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    } else {
      setIsSupported(false);
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  const subscribeToPush = () =>
    startTransition(async () => {
      setOptimisticIsSubscribed(true);
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          ENV.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        ),
      });
      setSubscription(sub);

      // PushSubscriptionをJSON.stringifyすると以下のような形になる
      // {
      //   endpoint: '.....',
      //   keys: {
      //     auth: '.....',
      //     p256dh: '.....'
      //   }
      // };
      await subscribeUser(JSON.parse(JSON.stringify(sub)));
    });

  const unsubscribeFromPush = () =>
    startTransition(async () => {
      setOptimisticIsSubscribed(false);
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    });

  if (isSupported === undefined) {
    return <IconSpinner mxAuto />;
  }

  if (isSupported === false) {
    return <p>プッシュ通知がご利用いただけません。</p>;
  }

  return (
    <div>
      <p className="mb-8px">
        現在の設定：
        <span className="font-bold">{isSubscribed ? 'オン' : 'オフ'}</span>
      </p>
      <PrimaryButton
        onClick={isSubscribed ? unsubscribeFromPush : subscribeToPush}
        style={isSubscribed ? 'outlined' : 'filled'}
        className="w-full"
      >
        通知を{isSubscribed ? 'オフ' : 'オン'}にする
      </PrimaryButton>
    </div>
  );
};
