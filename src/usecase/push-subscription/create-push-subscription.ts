import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import { pushSubscriptionRowToPushSubscription } from '@/libs/supabase/interface/push-subscription';

export const createPushSubscription = async (
  subscription: Omit<PushSubscriptionType, 'userId'>,
): Promise<PushSubscriptionType> => {
  const supabaseClient = await createSupabaseServerClient();

  const authResponse = await supabaseClient.auth.getUser();
  if (authResponse.error) {
    console.error(authResponse.error);
    throw new UsecaseAuthError({
      module: 'push-subscription',
      function: 'createPushSubscription',
    });
  }

  const authUser = authResponse.data.user;

  const res = await supabaseClient
    .from('push_subscriptions')
    .insert({
      user_id: authUser.id,
      endpoint: subscription.endpoint,
      key_p256dh: subscription.keys.p256dh,
      key_auth: subscription.keys.auth,
    })
    .select()
    .single();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'push-subscription',
      function: 'createPushSubscription',
    });
  }

  return pushSubscriptionRowToPushSubscription(res.data);
};
