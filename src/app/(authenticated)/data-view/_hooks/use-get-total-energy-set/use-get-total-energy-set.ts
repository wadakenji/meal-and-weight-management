import useSWR from 'swr';
import { dateToDateColumnValue, getOneMonthAgoDate } from '@/utils/date';
import { DayTotalEnergySetResponseData } from '@/app/api/day-total-energy-set/route';

const fetcher = async ([url, userId, startDate, endDate]: [
  string,
  string,
  string,
  string,
]): Promise<DayTotalEnergySetResponseData> => {
  const searchParams = new URLSearchParams({
    'user-id': userId,
    'start-date': startDate,
    'end-date': endDate,
  });
  const res = await fetch(`${url}?${searchParams}`);
  return res.json();
};

export const useGetTotalEnergySet = (userId: string) => {
  const today = new Date();
  const oneMonthAgo = getOneMonthAgoDate();

  const { data, isLoading } = useSWR(
    [
      '/api/day-total-energy-set',
      userId,
      dateToDateColumnValue(oneMonthAgo),
      dateToDateColumnValue(today),
    ],
    fetcher,
  );
  return { totalEnergyList: data, isLoading };
};
