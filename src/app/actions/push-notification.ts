'use server';

import webpush from 'web-push';
import { ENV } from '@/constants/env';
import {
  createPushSubscription,
  deletePushSubscription,
  getRelatedSubscriptions,
} from '@/usecase/push-subscription';
import { revalidatePath } from 'next/cache';

webpush.setVapidDetails(
  ENV.VAPID_SUBJECT,
  ENV.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  ENV.VAPID_PRIVATE_KEY,
);

export const subscribeUser = async (
  pushSubscription: Omit<PushSubscriptionType, 'userId'>,
) => {
  await createPushSubscription(pushSubscription);
  revalidatePath('/settings');
};

export const unsubscribeUser = async () => {
  await deletePushSubscription();
  revalidatePath('/settings');
};

export const sendNotification = async (message: string) => {
  const pushSubscriptions = await getRelatedSubscriptions();

  for (const pushSubscription of pushSubscriptions) {
    await webpush
      .sendNotification(
        pushSubscription,
        JSON.stringify({
          title: 'Test Notification',
          body: message,
          icon: '/icons/48.png',
        }),
      )
      .catch(console.error);
  }
};
