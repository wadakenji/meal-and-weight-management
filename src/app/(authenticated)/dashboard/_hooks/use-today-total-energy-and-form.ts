import { useActionState, useEffect, useState } from 'react';
import { isToday } from '@/utils/date';
import { registerMealAction } from '@/app/actions/register-meal';

export const useTodayTotalEnergyAndForm = (
  todayTotalEnergyInitialValue: number,
) => {
  const [registerMealState, registerMealFormAction] = useActionState(
    registerMealAction,
    null,
  );

  const [todayTotalEnergy, setTodayTotalEnergy] = useState(
    todayTotalEnergyInitialValue,
  );

  useEffect(() => {
    if (!registerMealState?.registeredMeal) return;
    if (!isToday(registerMealState.registeredMeal.datetime)) return;
    setTodayTotalEnergy(
      (prev) => prev + registerMealState.registeredMeal.amountOfEnergy,
    );
  }, [registerMealState]);

  return { todayTotalEnergy, registerMealFormAction };
};
