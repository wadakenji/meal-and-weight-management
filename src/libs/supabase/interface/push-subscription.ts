import { Database } from '@/types/supabase';

type PushSubscriptionRow =
  Database['public']['Tables']['push_subscriptions']['Row'];
type PushSubscriptionProps =
  Database['public']['Tables']['push_subscriptions']['Insert'];

export const pushSubscriptionRowToPushSubscription = (
  pushSubscriptionRow: PushSubscriptionRow,
): PushSubscriptionType => {
  return {
    userId: pushSubscriptionRow.user_id,
    endpoint: pushSubscriptionRow.endpoint,
    keys: {
      p256dh: pushSubscriptionRow.key_p256dh,
      auth: pushSubscriptionRow.key_auth,
    },
  };
};

export const pushSubscriptionToPushSubscriptionProps = (
  pushSubscription: PushSubscriptionType,
): PushSubscriptionProps => {
  return {
    user_id: pushSubscription.userId,
    endpoint: pushSubscription.endpoint,
    key_p256dh: pushSubscription.keys.p256dh,
    key_auth: pushSubscription.keys.auth,
  };
};
