'use client';

import { FC, useState } from 'react';
import { Modal } from '@/components/modal/modal';
import {
  dateStringToLocalTimezoneDate,
  getOneMonthAgoDate,
} from '@/utils/date';
import { useGetWeightRecordSet } from '@/app/(authenticated)/data-view/_hooks/use-get-weight-record-set/use-get-weight-record-set';
import { DATE_WIDTH, DateLineChart } from '@/components/chart/date-line-chart';
import { IconMagnifyingGlassPlus } from '@/components/icon/magnifying-glass-plus';
import { IconMagnifyingGlassMinus } from '@/components/icon/magnifying-glass-minus';

type Props = {
  isOpen: boolean;
  close: () => void;
  userId: string;
  username: string | undefined;
};

export const WeightChartModal: FC<Props> = ({
  isOpen,
  close,
  userId,
  username,
}) => {
  const { weightRecords } = useGetWeightRecordSet(userId);
  const [chartDateWidth, setChartDateWidth] = useState(DATE_WIDTH);
  const [showsChartDot, setShowsChartDot] = useState(true);
  const incrementDateWidth = () => setChartDateWidth((prev) => prev * 1.2);
  const decrementDateWidth = () =>
    setChartDateWidth((prev) => {
      if (prev <= 1) return prev;
      return prev / 1.2;
    });

  const chartData =
    weightRecords?.map(({ date, weight }) => ({
      date: dateStringToLocalTimezoneDate(date),
      value: weight,
    })) ?? [];

  const startDate = getOneMonthAgoDate();
  const endDate = new Date();

  return (
    <Modal close={close} isOpen={isOpen}>
      <h2 className="text-center text-xl font-bold">
        {username ? username + 'さんの' : ''}体重グラフ
      </h2>
      <div className="mb-16px">
        <DateLineChart
          data={chartData}
          startDate={startDate}
          endDate={endDate}
          dateWidth={chartDateWidth}
          showsDot={showsChartDot}
        />
      </div>
      <div className="flex justify-between gap-x-16px">
        <label className="flex items-center gap-x-4px text-sm text-text-gray">
          <input
            type="checkbox"
            checked={showsChartDot}
            onChange={(e) => setShowsChartDot(e.target.checked)}
          />
          <span>数字を表示する</span>
        </label>
        <div className="flex grow gap-x-8px *:flex-1">
          <button
            onClick={decrementDateWidth}
            className="flex items-center justify-center gap-x-4px rounded-lg border border-primary-light p-8px text-primary"
          >
            <IconMagnifyingGlassMinus />
            <span>縮小</span>
          </button>
          <button
            onClick={incrementDateWidth}
            className="flex items-center justify-center gap-x-4px rounded-lg border border-primary-light p-8px text-primary"
          >
            <IconMagnifyingGlassPlus />
            <span>拡大</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
