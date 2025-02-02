import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';

export const deletePushSubscription = async () => {
  const supabaseClient = await createSupabaseServerClient();

  const authResponse = await supabaseClient.auth.getUser();
  if (authResponse.error) {
    console.error(authResponse.error);
    throw new UsecaseAuthError({
      module: 'push-subscription',
      function: 'deletePushSubscription',
    });
  }

  const authUser = authResponse.data.user;

  const res = await supabaseClient
    .from('push_subscriptions')
    .delete()
    .eq('user_id', authUser.id);

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'push-subscription',
      function: 'deletePushSubscription',
    });
  }
};
