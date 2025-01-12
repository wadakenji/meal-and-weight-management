'use client';

import { FC } from 'react';
import { DateLineChart } from '@/components/chart/date-line-chart';
import {
  dateStringToLocalTimezoneDate,
  getOneMonthAgoDate,
} from '@/utils/date';

type Props = {
  weightRecords: WeightRecord[];
};

export const WeightChart: FC<Props> = ({ weightRecords }) => {
  const chartData = weightRecords.map(({ date, weight }) => ({
    date: dateStringToLocalTimezoneDate(date),
    value: weight,
  }));

  const startDate = getOneMonthAgoDate();
  const endDate = new Date();

  return (
    <DateLineChart data={chartData} startDate={startDate} endDate={endDate} />
  );
};
