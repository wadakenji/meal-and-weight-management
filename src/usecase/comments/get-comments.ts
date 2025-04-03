import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { commentRowToComment } from '@/libs/supabase/interface/comment';
import { UsecaseDbError } from '@/usecase/shared/error';

export const getComments = async (receiverId: string, date: string) => {
  const supabaseClient = await createSupabaseServerClient();

  const res = await supabaseClient
    .from('comments')
    .select()
    .eq('date', date)
    .eq('receiver_id', receiverId);

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'comment',
      function: 'getComments',
    });
  }

  return res.data.map((row) => commentRowToComment(row));
};
