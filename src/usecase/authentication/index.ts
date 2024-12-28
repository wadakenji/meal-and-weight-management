import { createSupabaseServerClient } from '@/libs/supabase/createClient';

export const signIn = async (
  email: string,
  password: string,
): Promise<void> => {
  const supabaseClient = await createSupabaseServerClient();
  await supabaseClient.auth
    .signInWithPassword({ email, password })
    .then((res) => {
      if (res.error) throw res.error;
    });
};

export const getUser = async (): Promise<User | null> => {
  const supabaseClient = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user === null || user.email === undefined) return null;

  return { email: user.email, username: '' };
};
