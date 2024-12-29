import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ENV } from '@/constants/env';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch (e) {
          console.error(e);
          // Cookies can only be modified in a Server Action or Route Handler.
        }
      },
    },
  });
};
