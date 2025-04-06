import { Database } from '@/types/supabase';
import { datetimeColumnValueToDate } from '@/utils/date';

type CommentRow = Database['public']['Tables']['comments']['Row'] & {
  sender: { name: string };
};
type CommentProps = Database['public']['Tables']['comments']['Insert'];

export const commentRowToComment = (commentRow: CommentRow): CommentType => {
  return {
    id: commentRow.id,
    receiverId: commentRow.receiver_id,
    senderId: commentRow.sender_id,
    senderName: commentRow.sender.name,
    date: commentRow.date,
    comment: commentRow.comment,
    createdAt: datetimeColumnValueToDate(commentRow.created_at),
  };
};

export const commentToCommentProps = (
  comment: CommentToCreate,
): CommentProps => {
  return {
    receiver_id: comment.receiverId,
    sender_id: comment.senderId,
    date: comment.date,
    comment: comment.comment,
  };
};
