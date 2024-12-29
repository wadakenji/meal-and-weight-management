import { createSupabaseServerClient } from '@/libs/supabase/createClient';

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

  const { name } = user;

  return { id, email, name };
};

export const updateUser = async (
  id: string,
  name: string,
  password: string | null,
): Promise<void> => {
  const supabaseClient = await createSupabaseServerClient();
  if (password !== null) await supabaseClient.auth.updateUser({ password });
  const res = await supabaseClient.from('users').upsert({ id, name });
  console.log(res);
};
