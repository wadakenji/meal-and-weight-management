import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import {
  commentRowToComment,
  commentToCommentProps,
} from '@/libs/supabase/interface/comment';

export const createComment = async (
  comment: Omit<CommentToCreate, 'senderId'>,
) => {
  const supabaseClient = await createSupabaseServerClient();

  const authResponse = await supabaseClient.auth.getUser();
  if (authResponse.error) {
    console.error(authResponse.error);
    throw new UsecaseAuthError({
      module: 'comment',
      function: 'createComment',
    });
  }

  const authUser = authResponse.data.user;

  const res = await supabaseClient
    .from('comments')
    .insert(commentToCommentProps({ ...comment, senderId: authUser.id }))
    .select('*, sender:users!sender_id ( name )')
    .single();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'comment',
      function: 'createComment',
    });
  }

  return commentRowToComment(res.data);
};
