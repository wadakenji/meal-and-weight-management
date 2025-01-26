import useSWR from 'swr';
import { SummaryOfDayResponseData } from '@/app/api/summary-of-day/route';

const fetcher = async ([url, userId, date]: [
  string,
  string,
  string,
]): Promise<SummaryOfDayResponseData> => {
  const searchParams = new URLSearchParams({ 'user-id': userId, date });
  const res = await fetch(`${url}?${searchParams}`);
  return res.json();
};

export const useGetSummaryOfDay = (userId: string, date: string) => {
  const { data, isLoading } = useSWR(
    ['/api/summary-of-day', userId, date],
    fetcher,
  );
  return { summaryOfDay: data, isLoading };
};
