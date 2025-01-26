'use client';

import { FC, use, useState } from 'react';
import { dateToDateInputValue } from '@/utils/date';
import { useGetSummaryOfDay } from '@/app/(authenticated)/data-view/_hooks/use-get-summary-of-day/use-get-summary-of-day';
import { useGetWeightRecordSet } from '@/app/(authenticated)/data-view/_hooks/use-get-weight-record-set/use-get-weight-record-set';
import { WeightChart } from '@/app/(authenticated)/data-view/_components/weight-chart/weight-chart';
import { Select } from '@/components/control/select/select';
import { DateInputSet } from '@/components/control/date-input-set/date-input-set';

type Props = {
  usersPromise: Promise<UserGroup['users']>;
};

export const DataView: FC<Props> = ({ usersPromise }) => {
  const userOptions = use(usersPromise);
  const selectOptions = userOptions.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const [userId, setUserId] = useState(userOptions[0].id);
  const [date, setDate] = useState(dateToDateInputValue(new Date()));
  const { summaryOfDay } = useGetSummaryOfDay(userId, date);
  const { weightRecords } = useGetWeightRecordSet(userId);

  return (
    <div>
      <Select
        options={selectOptions}
        setValue={setUserId}
        value={userId}
        className="mx-auto mb-16px block"
      />
      <div className="rounded border border-line p-16px">
        <DateInputSet
          date={date}
          setDate={setDate}
          className="mx-auto mb-16px"
          max={dateToDateInputValue(new Date())}
        />
        {summaryOfDay && (
          <div>
            <p>体重：{summaryOfDay.weightRecord?.weight || '未登録'}</p>
            <p>歩数：{summaryOfDay.stepRecord?.step || '未登録'}</p>
            <p>カロリー：{summaryOfDay.totalEnergy}</p>
            {summaryOfDay.meals.map((meal) => (
              <p key={meal.id}>{meal.name}</p>
            ))}
          </div>
        )}
      </div>
      {weightRecords && <WeightChart weightRecords={weightRecords} />}
    </div>
  );
};
