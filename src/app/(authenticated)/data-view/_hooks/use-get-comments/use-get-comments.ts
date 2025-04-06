import useSWR from 'swr';
import { CommentsResponseData } from '@/app/api/comments/route';

const fetcher = async ([url, receiverId, date]: [
  string,
  string,
  string,
]): Promise<CommentsResponseData> => {
  const searchParams = new URLSearchParams({ 'receiver-id': receiverId, date });
  const res = await fetch(`${url}?${searchParams}`);
  return res.json();
};

export const useGetComments = (receiverId: string, date: string) => {
  const { data, isLoading } = useSWR(
    ['/api/comments', receiverId, date],
    fetcher,
  );
  return { comments: data, isLoading };
};
