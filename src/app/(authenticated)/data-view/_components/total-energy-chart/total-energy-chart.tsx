'use client';

import { FC } from 'react';
import { DateLineChart } from '@/components/chart/date-line-chart';
import {
  dateStringToLocalTimezoneDate,
  getOneMonthAgoDate,
} from '@/utils/date';

type Props = {
  totalEnergyList: { date: string; totalEnergy: number }[];
};

export const TotalEnergyChart: FC<Props> = ({ totalEnergyList }) => {
  const chartData = totalEnergyList.map(({ date, totalEnergy }) => ({
    date: dateStringToLocalTimezoneDate(date),
    value: totalEnergy,
  }));

  const startDate = getOneMonthAgoDate();
  const endDate = new Date();

  return (
    <DateLineChart
      data={chartData}
      startDate={startDate}
      endDate={endDate}
      marginRight={70}
      color="red"
    />
  );
};
