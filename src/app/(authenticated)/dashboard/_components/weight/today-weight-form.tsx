'use client';

import { FC, use } from 'react';
import { DashboardDataText } from '@/app/(authenticated)/dashboard/_components/data-text/data-text';
import { Input } from '@/components/control/input/input';
import { CheckIconButton } from '@/components/control/button/check-icon-button/check-icon-button';
import { dateToDateInputValue } from '@/utils/date';
import { useTodayWeightAndForm } from '@/app/(authenticated)/dashboard/_hooks/use-today-weight-and-form';
import { WEIGHT_FORM_VALUE_NAMES } from '@/helpers/form/register-weight-record-form';

type Props = {
  todayWeightPromise: Promise<number | null>;
};

export const TodayWeightForm: FC<Props> = ({ todayWeightPromise }) => {
  const initialTodayWeight = use(todayWeightPromise);
  const { todayWeight, registerWeightFormAction, isPending } =
    useTodayWeightAndForm(initialTodayWeight);

  return (
    <>
      {todayWeight !== null ? (
        <DashboardDataText unitText="kg" value={todayWeight} />
      ) : (
        <form action={registerWeightFormAction}>
          <div className="mb-8px flex items-end gap-x-8px">
            <Input
              name={WEIGHT_FORM_VALUE_NAMES.WEIGHT}
              type="number"
              step={0.01}
              required
            />
            <span className="font-bold">kg</span>
          </div>
          <CheckIconButton isPending={isPending} disabled={isPending} />
          <input
            name={WEIGHT_FORM_VALUE_NAMES.DATE}
            type="hidden"
            value={dateToDateInputValue(new Date())}
          />
        </form>
      )}
    </>
  );
};
