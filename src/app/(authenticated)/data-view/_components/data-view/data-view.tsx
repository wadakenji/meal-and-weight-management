'use client';

import { FC, use, useState } from 'react';
import { dateToDateInputValue } from '@/utils/date';
import { useGetSummaryOfDay } from '@/app/(authenticated)/data-view/_hooks/use-get-summary-of-day/use-get-summary-of-day';
import { Select } from '@/components/control/select/select';
import { DateInputSet } from '@/components/control/date-input-set/date-input-set';
import { IconSpinner } from '@/components/icon/spinner';
import { DataText } from '@/app/(authenticated)/data-view/_components/data-text/data-text';
import { CommentModal } from '@/app/(authenticated)/data-view/_components/comment-modal/comment-modal';
import { IconComment } from '@/components/icon/comment';
import { WeightChartModal } from '@/app/(authenticated)/data-view/_components/weight-chart-modal/weight-chart-modal';
import { IconLineChart } from '@/components/icon/line-chart';

type Props = {
  usersPromise: Promise<UserGroup['users']>;
  loggedInUserPromise: Promise<User | null>;
  searchParamsPromise: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export const DataView: FC<Props> = ({
  usersPromise,
  loggedInUserPromise,
  searchParamsPromise,
}) => {
  const userOptions = use(usersPromise);
  const loggedInUser = use(loggedInUserPromise);
  const searchParams = use(searchParamsPromise);

  const initialUserId =
    typeof searchParams['user-id'] === 'string'
      ? searchParams['user-id']
      : undefined;
  const initialDateString =
    typeof searchParams['date'] === 'string' ? searchParams['date'] : undefined;
  const initialIsCommentModalOpen = Boolean(
    searchParams['is-comment-modal-open'],
  );

  const selectOptions = userOptions.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const [userId, setUserId] = useState(
    initialUserId || loggedInUser?.id || userOptions[0].id,
  );
  const user = userOptions.find(({ id }) => id === userId);
  const [date, setDate] = useState(
    initialDateString || dateToDateInputValue(new Date()),
  );
  const { summaryOfDay, isLoading: summaryOfDayLoading } = useGetSummaryOfDay(
    userId,
    date,
  );

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(
    initialIsCommentModalOpen,
  );
  const [isWeightChartModalOpen, setIsWeightChartModalOpen] = useState(false);

  if (!loggedInUser) return null;

  return (
    <div className="space-y-32px">
      <Select
        options={selectOptions}
        setValue={setUserId}
        value={userId}
        className="mx-auto block"
      />
      <div className="flex justify-center">
        <button
          className="flex items-center gap-x-4px text-xl text-text-link"
          onClick={() => setIsWeightChartModalOpen(true)}
        >
          <IconLineChart color="link" size={22} />
          <span>体重グラフを見る</span>
        </button>
      </div>
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
            <div className="mb-24px min-h-[64px]">
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
            <div className="flex justify-end">
              <button
                className="flex items-center gap-x-4px text-text-link hover:underline"
                onClick={() => setIsCommentModalOpen(true)}
                type="button"
              >
                <span>メッセージ</span>
                <IconComment />
              </button>
            </div>
          </div>
        )}
      </section>
      <CommentModal
        close={() => setIsCommentModalOpen(false)}
        date={date}
        isOpen={isCommentModalOpen}
        receiverId={userId}
        receiverName={user?.name}
        loggedInUserId={loggedInUser.id}
      />
      <WeightChartModal
        close={() => setIsWeightChartModalOpen(false)}
        isOpen={isWeightChartModalOpen}
        userId={userId}
        username={user?.name}
      />
    </div>
  );
};
