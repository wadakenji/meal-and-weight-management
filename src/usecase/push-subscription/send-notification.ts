import webpush from 'web-push';
import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { getRelatedUsers } from '@/usecase/user-group';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import { pushSubscriptionRowToPushSubscription } from '@/libs/supabase/interface/push-subscription';

export const sendNotification = async (title: string, body: string) => {
  const supabaseClient = await createSupabaseServerClient();

  const authResponse = await supabaseClient.auth.getUser();
  if (authResponse.error) {
    console.error(authResponse.error);
    throw new UsecaseAuthError({
      module: 'push-subscription',
      function: 'sendNotification',
    });
  }
  const loggedInUser = authResponse.data.user;

  const relatedUsers = await getRelatedUsers();

  const res = await supabaseClient
    .from('push_subscriptions')
    .select()
    .in(
      'user_id',
      relatedUsers.map(({ id }) => id),
    )
    .neq('user_id', loggedInUser.id);

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'push-subscription',
      function: 'sendNotification',
    });
  }

  const pushSubscriptions = res.data.map(pushSubscriptionRowToPushSubscription);

  for (const pushSubscription of pushSubscriptions) {
    await webpush
      .sendNotification(pushSubscription, JSON.stringify({ title, body }))
      .catch(console.error);
  }
};
