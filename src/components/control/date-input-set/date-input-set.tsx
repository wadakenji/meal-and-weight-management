'use client';

import { FC } from 'react';
import { addDays, dateStringToDate, dateToDateInputValue } from '@/utils/date';
import { IconChevronLeft } from '@/components/icon/chevron-left';
import clsx from 'clsx';
import { IconChevronRight } from '@/components/icon/chevron-right';

type Props = {
  date: string;
  setDate: (date: string) => void;
  min?: string;
  max?: string;
  className?: string;
};

export const DateInputSet: FC<Props> = ({
  date,
  setDate,
  min,
  max,
  className,
}) => {
  const incrementDate = () => {
    const currentDate = dateStringToDate(date);
    const nextDate = addDays(currentDate, 1);
    setDate(dateToDateInputValue(nextDate));
  };
  const decrementDate = () => {
    const currentDate = dateStringToDate(date);
    const nextDate = addDays(currentDate, -1);
    setDate(dateToDateInputValue(nextDate));
  };

  return (
    <div className={clsx('flex w-fit items-center gap-8px', className)}>
      <button
        onClick={decrementDate}
        className="flex size-min-button-size items-center justify-center rounded-full border-2 border-primary disabled:opacity-30"
        disabled={!!min && date <= min}
      >
        <IconChevronLeft />
      </button>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={min}
        max={max}
        className="h-[52px] rounded border border-line bg-white px-16px py-8px text-2xl"
      />
      <button
        onClick={incrementDate}
        className="flex size-min-button-size items-center justify-center rounded-full border-2 border-primary disabled:opacity-30"
        disabled={!!max && max <= date}
      >
        <IconChevronRight />
      </button>
    </div>
  );
};
