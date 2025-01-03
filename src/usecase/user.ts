import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import {
  supabaseUserToUser,
  userToSupabaseUserProps,
} from '@/libs/supabase/interface/user';

export const getUser = async (): Promise<User | null> => {
  const supabaseClient = await createSupabaseServerClient();

  const {
    data: { user: authUser },
  } = await supabaseClient.auth.getUser();
  if (authUser === null) return null;

  const { email, id } = authUser;
  if (email === undefined) return null;

  const queryResponse = await supabaseClient
    .from('users')
    .select()
    .eq('id', id);
  const user = queryResponse.data?.[0];
  if (!user) return { id, email };

  return supabaseUserToUser(id, email, user);
};

export const updateUser = async (
  user: User,
  password: string | null,
): Promise<User> => {
  const supabaseClient = await createSupabaseServerClient();

  if (password !== null) await supabaseClient.auth.updateUser({ password });

  const res = await supabaseClient
    .from('users')
    .upsert(userToSupabaseUserProps(user))
    .select()
    .single();

  if (res.error) {
    console.error(res.error);
    throw new Error('usecase: updateUser');
  }

  return supabaseUserToUser(user.id, user.email, res.data);
};
