import { createSupabaseServerClient } from '@/libs/supabase/createClient';

export const signIn = async (
  email: string,
  password: string,
): Promise<void> => {
  const supabaseClient = await createSupabaseServerClient();
  await supabaseClient.auth
    .signInWithPassword({ email, password })
    .then((res) => {
      if (res.error) {
        console.error(res.error);
        throw new Error('usecase: signIn');
      }
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
      if (res.error) {
        console.error(res.error);
        throw new Error('usecase: verifyInviteEmailToken');
      }
    });
};

export const getSession = async (): Promise<Session | null> => {
  const supabaseClient = await createSupabaseServerClient();
  const res = await supabaseClient.auth.getSession();
  if (!res.data.session) return null;

  const userId = res.data.session.user.id;
  const email = res.data.session.user.email;
  const userRegistered = res.data.session.user.user_metadata.userRegistered as
    | boolean
    | undefined;

  return { userId, email, userRegistered };
};
