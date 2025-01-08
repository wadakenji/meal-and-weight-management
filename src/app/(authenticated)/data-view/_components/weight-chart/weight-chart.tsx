'use client';

import { FC, use } from 'react';
import { DateLineChart } from '@/components/chart/date-line-chart';
import { getOneMonthAgoDate } from '@/utils/date';

type Props = {
  weightRecordsPromise: Promise<WeightRecord[]>;
};

export const WeightChart: FC<Props> = ({ weightRecordsPromise }) => {
  const weightRecords = use(weightRecordsPromise);
  const chartData = weightRecords.map(({ date, weight }) => ({
    date,
    value: weight,
  }));

  const startDate = getOneMonthAgoDate();
  const endDate = new Date();

  return (
    <DateLineChart data={chartData} startDate={startDate} endDate={endDate} />
  );
};
