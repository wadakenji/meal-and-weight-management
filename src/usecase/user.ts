import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { userRowToUser, userToUserProps } from '@/libs/supabase/interface/user';

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
    throw new Error('usecase: getUser');
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

  // todo error handling
  await supabaseClient.auth.updateUser({
    password: password || undefined,
    data: { userRegistered: true, username: user.name },
  });

  const res = await supabaseClient
    .from('users')
    .upsert(userToUserProps(user))
    .select()
    .single();

  if (res.error) {
    console.error(res.error);
    throw new Error('usecase: updateUser');
  }

  return userRowToUser(user.id, user.email, res.data);
};
