'use client';

import { FC, use, useState } from 'react';
import { dateToDateInputValue } from '@/utils/date';
import { useGetSummaryOfDay } from '@/app/(authenticated)/data-view/_hooks/use-get-summary-of-day/use-get-summary-of-day';
import { useGetWeightRecordSet } from '@/app/(authenticated)/data-view/_hooks/use-get-weight-record-set/use-get-weight-record-set';
import { WeightChart } from '@/app/(authenticated)/data-view/_components/weight-chart/weight-chart';
import { Select } from '@/components/control/select/select';
import { DateInputSet } from '@/components/control/date-input-set/date-input-set';
import { IconSpinner } from '@/components/icon/spinner';
import { DataText } from '@/app/(authenticated)/data-view/_components/data-text/data-text';

type Props = {
  usersPromise: Promise<UserGroup['users']>;
  loggedInUserPromise: Promise<User | null>;
};

export const DataView: FC<Props> = ({ usersPromise, loggedInUserPromise }) => {
  const userOptions = use(usersPromise);
  const loggedInUser = use(loggedInUserPromise);

  const selectOptions = userOptions.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const [userId, setUserId] = useState(loggedInUser?.id || userOptions[0].id);
  const [date, setDate] = useState(dateToDateInputValue(new Date()));
  const { summaryOfDay, isLoading: summaryOfDayLoading } = useGetSummaryOfDay(
    userId,
    date,
  );
  const { weightRecords } = useGetWeightRecordSet(userId);

  return (
    <div className="space-y-32px">
      <Select
        options={selectOptions}
        setValue={setUserId}
        value={userId}
        className="mx-auto block"
      />
      <section className="rounded border border-line p-24px">
        <DateInputSet
          date={date}
          setDate={setDate}
          className="mx-auto mb-24px"
          max={dateToDateInputValue(new Date())}
        />
        {summaryOfDayLoading && (
          <div className="flex h-[152px] items-center">
            <IconSpinner size={32} mxAuto />
          </div>
        )}
        {summaryOfDay && (
          <div>
            <div className="mb-24px flex min-h-[64px] gap-24px">
              <DataText
                title="歩数"
                unit="歩"
                value={summaryOfDay.stepRecord?.step}
                className="flex-1"
              />
              <DataText
                title="体重"
                unit="kg"
                value={summaryOfDay.weightRecord?.weight}
                className="flex-1"
              />
            </div>
            <div className="min-h-[64px]">
              <DataText
                title="摂取カロリー"
                unit="kcal"
                value={summaryOfDay.totalEnergy}
              />
              {summaryOfDay.meals.length > 0 && (
                <div className="mx-auto mt-16px w-fit space-y-4px">
                  {summaryOfDay.meals.map((meal) => (
                    <p
                      key={meal.id}
                      className="flex justify-between gap-x-16px"
                    >
                      <span className="font-bold">{meal.name}</span>
                      <span>
                        <span className="mr-4px">
                          {meal.amountOfEnergy.toLocaleString()}
                        </span>
                        <span className="text-sm">kcal</span>
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      {weightRecords && (
        <section>
          <h2 className="font-bold">体重グラフ</h2>
          <WeightChart weightRecords={weightRecords} />
        </section>
      )}
    </div>
  );
};
