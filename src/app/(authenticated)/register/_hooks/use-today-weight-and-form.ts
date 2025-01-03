import { useActionState, useEffect, useState } from 'react';
import { registerWeightAction } from '@/app/actions/register-weight';
import { isToday } from '@/utils/date';

export const useTodayWeightAndForm = (
  todayWeightInitialValue: number | null,
) => {
  const [registerWeightState, registerWeightFormAction] = useActionState(
    registerWeightAction,
    null,
  );

  const [todayWeight, setTodayWeight] = useState(todayWeightInitialValue);

  useEffect(() => {
    if (!registerWeightState?.registeredWeightRecord) return;
    if (!isToday(registerWeightState.registeredWeightRecord.date)) return;
    setTodayWeight(registerWeightState.registeredWeightRecord.weight);
  }, [registerWeightState]);

  return { todayWeight, registerWeightFormAction };
};
