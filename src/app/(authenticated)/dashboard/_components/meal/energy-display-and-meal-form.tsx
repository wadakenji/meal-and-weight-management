import { FC, use } from 'react';
import { DashboardDataText } from '@/app/(authenticated)/dashboard/_components/data-text/data-text';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { MEAL_FORM_VALUE_NAMES } from '@/helpers/form/register-meal-form';
import { dateToDatetimeInputValue, getRangeOfDate } from '@/utils/date';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { getTodayTotalEnergy } from '@/usecase/meal';
import { registerMealAction } from '@/app/actions/register-meal';
import { TIMEZONE } from '@/constants/timezone';

export const EnergyDisplayAndMealForm: FC = () => {
  const todayTotalEnergy = use(getTodayTotalEnergy());

  const action = async (formData: FormData) => {
    'use server';
    await registerMealAction(null, formData);
  };

  const today = new Date();
  const [startOfToday, endOfToday] = getRangeOfDate(today, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });

  return (
    <>
      <DashboardDataText unitText={'kcal'} value={todayTotalEnergy} />
      <form action={action} className="mt-8px">
        <div className="mb-24px space-y-16px">
          <LabelInputSet
            labelText="時間"
            type="datetime-local"
            name={MEAL_FORM_VALUE_NAMES.DATETIME}
            defaultValue={dateToDatetimeInputValue(today)}
            min={dateToDatetimeInputValue(startOfToday)}
            max={dateToDatetimeInputValue(endOfToday)}
            required
          />
          <LabelInputSet
            labelText="食べたもの"
            type="text"
            name={MEAL_FORM_VALUE_NAMES.NAME}
            required
          />
          <LabelInputSet
            labelText="カロリー（kcal）"
            type="number"
            name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_ENERGY}
            step={0.01}
            required
          />
          <LabelInputSet
            labelText="タンパク質（g）"
            type="number"
            step={0.01}
            name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_PROTEIN}
          />
        </div>
        <FormSubmitButton />
      </form>
    </>
  );
};
