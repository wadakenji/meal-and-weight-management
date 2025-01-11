import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { userRowToUser, userToUserProps } from '@/libs/supabase/interface/user';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';

export const getUser = async (): Promise<User | null> => {
  const supabaseClient = await createSupabaseServerClient();

  const {
    data: { user: authUser },
  } = await supabaseClient.auth.getUser();
  if (authUser === null) return null;

  const { email, id } = authUser;
  if (email === undefined) return null;

  const res = await supabaseClient
    .from('users')
    .select()
    .eq('id', id)
    .limit(1)
    .maybeSingle();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({ module: 'user', function: 'getUser' });
  }

  const user = res.data;
  if (!user) return { id, email };

  return userRowToUser(id, email, user);
};

export const updateUser = async (
  user: User,
  password: string | null,
): Promise<User> => {
  const supabaseClient = await createSupabaseServerClient();

  const res = await supabaseClient.auth
    .updateUser({
      password: password || undefined,
      data: { userRegistered: true, username: user.name },
    })
    .then(async (authRes) => {
      if (authRes.error) {
        console.error(authRes.error);
        throw new UsecaseAuthError({ module: 'user', function: 'updateUser' });
      }

      const dbRes = await supabaseClient
        .from('users')
        .upsert(userToUserProps(user))
        .select()
        .single();

      if (dbRes.error) {
        console.error(dbRes.error);
        throw new UsecaseDbError({ module: 'user', function: 'updateUser' });
      }

      return dbRes;
    });

  return userRowToUser(user.id, user.email, res.data);
};
