import { useActionState, useEffect, useState } from 'react';
import { registerStepAction } from '@/app/actions/register-step';
import { isYesterday } from '@/utils/date';

export const useYesterdayStepAndForm = (
  yesterdayStepInitialValue: number | null,
) => {
  const [registerStepState, registerStepFormAction] = useActionState(
    registerStepAction,
    null,
  );

  const [yesterdayStep, setYesterdayStep] = useState(yesterdayStepInitialValue);

  useEffect(() => {
    if (!registerStepState?.registeredStepRecord) return;
    if (!isYesterday(registerStepState.registeredStepRecord.date)) return;
    setYesterdayStep(registerStepState.registeredStepRecord.step);
  }, [registerStepState]);

  return { yesterdayStep, registerStepFormAction };
};
