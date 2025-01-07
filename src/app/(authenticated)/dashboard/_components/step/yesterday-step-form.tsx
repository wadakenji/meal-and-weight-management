'use client';

import { FC, use } from 'react';
import { DashboardDataText } from '@/app/(authenticated)/dashboard/_components/data-text/data-text';
import { useYesterdayStepAndForm } from '@/app/(authenticated)/dashboard/_hooks/use-yesterday-step-and-form';
import { Input } from '@/components/control/input/input';
import { CheckIconButton } from '@/components/control/button/check-icon-button/check-icon-button';
import { STEP_FORM_VALUE_NAMES } from '@/helpers/form/register-step-record-form';
import { dateToDateInputValue, getYesterday } from '@/utils/date';

type Props = {
  yesterdayStepPromise: Promise<number | null>;
};

export const YesterdayStepForm: FC<Props> = ({ yesterdayStepPromise }) => {
  const initialYesterdayStep = use(yesterdayStepPromise);
  const { yesterdayStep, registerStepFormAction, isPending } =
    useYesterdayStepAndForm(initialYesterdayStep);

  return (
    <>
      {yesterdayStep !== null ? (
        <DashboardDataText unitText="歩" value={yesterdayStep} />
      ) : (
        <form action={registerStepFormAction}>
          <div className="mb-8px flex items-end gap-x-8px">
            <Input name={STEP_FORM_VALUE_NAMES.STEP} type="number" />
            <span className="font-bold">歩</span>
          </div>
          <CheckIconButton isPending={isPending} disabled={isPending} />
          <input
            name={STEP_FORM_VALUE_NAMES.DATE}
            type="hidden"
            value={dateToDateInputValue(getYesterday())}
          />
        </form>
      )}
    </>
  );
};
