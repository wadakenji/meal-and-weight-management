import { useActionState, useEffect, useState } from 'react';
import { registerStepAction } from '@/app/actions/register-step';
import { dateStringToLocalTimezoneDate, isYesterday } from '@/utils/date';

export const useYesterdayStepAndForm = (
  yesterdayStepInitialValue: number | null,
) => {
  const [registerStepState, registerStepFormAction, isPending] = useActionState(
    registerStepAction,
    null,
  );

  const [yesterdayStep, setYesterdayStep] = useState(yesterdayStepInitialValue);

  useEffect(() => {
    if (!registerStepState?.registeredStepRecord) return;
    if (
      !isYesterday(
        dateStringToLocalTimezoneDate(
          registerStepState.registeredStepRecord.date,
        ),
      )
    )
      return;
    setYesterdayStep(registerStepState.registeredStepRecord.step);
  }, [registerStepState]);

  return { yesterdayStep, registerStepFormAction, isPending };
};
