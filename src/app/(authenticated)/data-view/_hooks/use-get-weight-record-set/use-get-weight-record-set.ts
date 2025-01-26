import useSWR from 'swr';
import { WeightRecordSetResponseData } from '@/app/api/weight-record-set/route';

const fetcher = async ([url, userId]: [
  string,
  string,
]): Promise<WeightRecordSetResponseData> => {
  const searchParams = new URLSearchParams({ 'user-id': userId });
  const res = await fetch(`${url}?${searchParams}`);
  return res.json();
};

export const useGetWeightRecordSet = (userId: string) => {
  const { data, isLoading } = useSWR(
    ['/api/weight-record-set', userId],
    fetcher,
  );
  return { weightRecords: data, isLoading };
};
