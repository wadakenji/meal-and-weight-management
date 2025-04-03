import { NextRequest } from 'next/server';
import { isValidDate } from '@/utils/date';
import { getComments } from '@/usecase/comments/get-comments';

export type CommentsResponseData = CommentType[];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [receiverId, date] = [
    searchParams.get('receiver-id'),
    searchParams.get('date'),
  ];

  if (!receiverId || !date || !isValidDate(new Date(date))) {
    const responseData: CommentsResponseData = [];
    return Response.json(responseData);
  }

  const comments = await getComments(receiverId, date);
  const responseData: CommentsResponseData = comments;
  return Response.json(responseData);
}
