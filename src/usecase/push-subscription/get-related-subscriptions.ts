import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { UsecaseDbError } from '@/usecase/shared/error';
import { getRelatedUsers } from '@/usecase/user-group';
import { pushSubscriptionRowToPushSubscription } from '@/libs/supabase/interface/push-subscription';

export const getRelatedSubscriptions = async () => {
  const supabaseClient = await createSupabaseServerClient();

  const relatedUsers = await getRelatedUsers();

  const res = await supabaseClient
    .from('push_subscriptions')
    .select()
    .in(
      'user_id',
      relatedUsers.map(({ id }) => id),
    );

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'push-subscription',
      function: 'getRelatedSubscriptions',
    });
  }

  return res.data.map(pushSubscriptionRowToPushSubscription);
};
