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
  const { data, isLoading, mutate } = useSWR(
    ['/api/weight-record-set', userId],
    fetcher,
  );
  const addWeightRecordsToCache = async (
    weightRecords: WeightRecordSetResponseData,
  ) => {
    if (!data) return;
    await mutate([...data, ...weightRecords], { revalidate: false });
  };

  return { weightRecords: data, isLoading, addWeightRecordsToCache };
};
