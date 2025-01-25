'use client';

import { FC, use, useState } from 'react';
import { dateToDateInputValue } from '@/utils/date';
import { useGetSummaryOfDay } from '@/app/(authenticated)/data-view/_hooks/use-get-summary-of-day/use-get-summary-of-day';
import { useGetWeightRecordSet } from '@/app/(authenticated)/data-view/_hooks/use-get-weight-record-set/use-get-weight-record-set';
import { WeightChart } from '@/app/(authenticated)/data-view/_components/weight-chart/weight-chart';

type Props = {
  usersPromise: Promise<UserGroup['users']>;
};

export const DataView: FC<Props> = ({ usersPromise }) => {
  const userOptions = use(usersPromise);

  const [userId, setUserId] = useState(userOptions[0].id);
  const [date, setDate] = useState(dateToDateInputValue(new Date()));
  const { summaryOfDay } = useGetSummaryOfDay(userId, date);
  const { weightRecords } = useGetWeightRecordSet(userId);

  return (
    <div>
      <select onChange={(e) => setUserId(e.target.value)} value={userId}>
        {userOptions.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="rounded border-line p-16px">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
