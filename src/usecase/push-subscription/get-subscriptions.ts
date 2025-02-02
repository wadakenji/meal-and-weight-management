import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import { pushSubscriptionRowToPushSubscription } from '@/libs/supabase/interface/push-subscription';

export const getPushSubscription = async () => {
  const supabaseClient = await createSupabaseServerClient();

  const authResponse = await supabaseClient.auth.getUser();
  if (authResponse.error) {
    console.error(authResponse.error);
    throw new UsecaseAuthError({
      module: 'push-subscription',
      function: 'getPushSubscription',
    });
  }

  const authUser = authResponse.data.user;

  const res = await supabaseClient
    .from('push_subscriptions')
    .select()
    .eq('user_id', authUser.id)
    .maybeSingle();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'push-subscription',
      function: 'getPushSubscription',
    });
  }

  return res.data && pushSubscriptionRowToPushSubscription(res.data);
};
