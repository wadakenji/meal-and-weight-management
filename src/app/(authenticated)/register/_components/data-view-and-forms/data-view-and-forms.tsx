'use client';

import { FC, useActionState, useEffect, useState } from 'react';
import { MealForm } from '@/app/(authenticated)/register/_components/form/meal-form/meal-form';
import { WeightForm } from '@/app/(authenticated)/register/_components/form/weight-form/weight-form';
import { StepForm } from '@/app/(authenticated)/register/_components/form/step-form/step-form';
import { registerWeightAction } from '@/app/actions/register-weight';
import { isToday } from '@/utils/date';

type Props = {
  initialValue: {
    todayWeight: number | null;
    yesterdayStep: number | null;
    todayTotalEnergy: number;
  };
};

export const DataViewAndForms: FC<Props> = ({ initialValue }) => {
  const [registerWeightState, registerWeightFormAction] = useActionState(
    registerWeightAction,
    null,
  );
  const [todayWeight, setTodayWeight] = useState(initialValue.todayWeight);
  useEffect(() => {
    if (!registerWeightState?.registeredWeightRecord) return;
    if (!isToday(registerWeightState.registeredWeightRecord.date)) return;
    setTodayWeight(registerWeightState.registeredWeightRecord.weight);
  }, [registerWeightState]);

  const yesterdayStep = initialValue.yesterdayStep;
  const todayTotalEnergy = initialValue.todayTotalEnergy;

  return (
    <>
      <p>体重：{todayWeight}</p>
      <p>歩数：{yesterdayStep}</p>
      <p>カロリー：{todayTotalEnergy}</p>
      <section className="mb-24px">
        <h2 className="mb-8px font-bold">食事登録</h2>
        <MealForm />
      </section>
      <section className="mb-24px">
        <h2 className="mb-8px font-bold">体重登録</h2>
        <WeightForm registerWeightAction={registerWeightFormAction} />
      </section>
      <section>
        <h2 className="mb-8px font-bold">歩数登録</h2>
        <StepForm />
      </section>
    </>
  );
};
