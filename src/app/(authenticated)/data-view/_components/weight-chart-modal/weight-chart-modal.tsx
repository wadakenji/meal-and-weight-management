'use client';

import { FC, useEffect, useState } from 'react';
import { Modal } from '@/components/modal/modal';
import {
  dateStringToLocalTimezoneDate,
  dateToDateColumnValue,
  getOneDayAgoDate,
  getOneMonthAgoDate,
} from '@/utils/date';
import { useGetWeightRecordSet } from '@/app/(authenticated)/data-view/_hooks/use-get-weight-record-set/use-get-weight-record-set';
import { DATE_WIDTH, DateLineChart } from '@/components/chart/date-line-chart';
import { IconMagnifyingGlassPlus } from '@/components/icon/magnifying-glass-plus';
import { IconMagnifyingGlassMinus } from '@/components/icon/magnifying-glass-minus';
import { WeightRecordSetResponseData } from '@/app/api/weight-record-set/route';
import { IconSpinner } from '@/components/icon/spinner';

type Props = {
  isOpen: boolean;
  close: () => void;
  userId: string;
  username: string | undefined;
};

const fetchMoreWeightRecords = async (
  userId: string,
  fromDate: Date,
  toDate: Date,
): Promise<WeightRecordSetResponseData> => {
  const searchParams = new URLSearchParams({
    'user-id': userId,
    'from-date': dateToDateColumnValue(fromDate),
    'to-date': dateToDateColumnValue(toDate),
  });
  const res = await fetch(`/api/weight-record-set?${searchParams}`);
  return res.json();
};

export const WeightChartModal: FC<Props> = ({
  isOpen,
  close,
  userId,
  username,
}) => {
  const oneMonthAgoDate = getOneMonthAgoDate();
  const [startDate, setStartDate] = useState(oneMonthAgoDate);
  const endDate = new Date();
  const { weightRecords, isLoading, addWeightRecordsToCache } =
    useGetWeightRecordSet(userId);
  const chartData =
    weightRecords?.map(({ date, weight }) => ({
      date: dateStringToLocalTimezoneDate(date),
      value: weight,
    })) ?? [];

  useEffect(() => {
    setStartDate(oneMonthAgoDate);
  }, [userId]);

  const [chartDateWidth, setChartDateWidth] = useState(DATE_WIDTH);
  const [showsChartDot, setShowsChartDot] = useState(true);
  const incrementDateWidth = () => setChartDateWidth((prev) => prev * 1.2);
  const decrementDateWidth = () =>
    setChartDateWidth((prev) => {
      if (prev <= 1) return prev;
      return prev / 1.2;
    });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const onClickMoreButton = async () => {
    setIsLoadingMore(true);
    const fromDate = getOneMonthAgoDate(startDate);
    const toDate = getOneDayAgoDate(startDate);
    const weightRecordsToAdd = await fetchMoreWeightRecords(
      userId,
      fromDate,
      toDate,
    );
    await addWeightRecordsToCache(weightRecordsToAdd);
    setStartDate(fromDate);
    setIsLoadingMore(false);
  };

  return (
    <Modal close={close} isOpen={isOpen}>
      <h2 className="text-center text-xl font-bold">
        {username ? username + 'さんの' : ''}体重グラフ
      </h2>
      {weightRecords === undefined && isLoading && (
        <div className="flex items-center justify-center p-32px">
          <IconSpinner />
        </div>
      )}
      {weightRecords !== undefined && (
        <>
          <div className="mb-16px">
            <DateLineChart
              data={chartData}
              startDate={startDate}
              endDate={endDate}
              dateWidth={chartDateWidth}
              showsDot={showsChartDot}
              onClickMoreButton={onClickMoreButton}
              isLoadingMore={isLoadingMore}
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
        </>
      )}
    </Modal>
  );
};
