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

export const verifyInviteEmailToken = async (
  email: string,
  token: string,
): Promise<void> => {
  const supabaseClient = await createSupabaseServerClient();
  await supabaseClient.auth
    .verifyOtp({ email, token, type: 'invite' })
    .then((res) => {
      if (res.error) throw res.error;
    });
};
