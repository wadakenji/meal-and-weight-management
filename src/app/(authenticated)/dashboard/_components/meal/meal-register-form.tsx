'use client';

import { FC, useState } from 'react';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { MEAL_FORM_VALUE_NAMES } from '@/helpers/form/register-meal-form';
import { dateToDatetimeInputValue, getRangeOfDate } from '@/utils/date';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { useMealRegisterForm } from '@/app/(authenticated)/dashboard/_hooks/use-meal-register-form/use-meal-register-form';
import { RecentMealsModal } from '@/app/(authenticated)/dashboard/_components/meal/recent-meals-modal';
import { IconClock } from '@/components/icon/clock';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';

type Props = {
  registerMealAction: (formData: FormData) => Promise<void>;
  recentMeals: Meal[];
};

export const MealRegisterForm: FC<Props> = ({
  registerMealAction,
  recentMeals,
}) => {
  const today = new Date();
  const [startOfToday, endOfToday] = getRangeOfDate(today);

  const [isOpenRecentMealModal, setIsOpenRecentMealModal] = useState(false);

  const {
    datetime,
    onChangeDatetime,
    name,
    onChangeName,
    energy,
    onChangeEnergy,
    protein,
    onChangeProtein,
    setMeal,
    clearForm,
  } = useMealRegisterForm();

  const action = async (formData: FormData) => {
    await registerMealAction(formData);
    clearForm();
  };

  return (
    <form action={action} className="mt-8px">
      <div className="mb-24px space-y-16px">
        <LabelInputSet
          labelText="時間"
          type="datetime-local"
          name={MEAL_FORM_VALUE_NAMES.DATETIME}
          min={dateToDatetimeInputValue(startOfToday)}
          max={dateToDatetimeInputValue(endOfToday)}
          value={datetime}
          onChange={onChangeDatetime}
          required
        />
        <LabelInputSet
          labelText="食べたもの"
          type="text"
          name={MEAL_FORM_VALUE_NAMES.NAME}
          value={name}
          onChange={onChangeName}
          required
        />
        <LabelInputSet
          labelText="カロリー（kcal）"
          type="number"
          name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_ENERGY}
          step={0.01}
          value={energy}
          onChange={onChangeEnergy}
          required
        />
        <LabelInputSet
          labelText="タンパク質（g）"
          type="number"
          step={0.01}
          name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_PROTEIN}
          value={protein}
          onChange={onChangeProtein}
        />
        <div className="flex justify-center">
          <PrimaryButton
            style="outlined"
            type="button"
            onClick={() => setIsOpenRecentMealModal(true)}
            className="flex items-center gap-x-4px"
          >
            <IconClock />
            <span>履歴から入力</span>
          </PrimaryButton>
        </div>
      </div>
      <FormSubmitButton />
      <RecentMealsModal
        close={() => setIsOpenRecentMealModal(false)}
        isOpen={isOpenRecentMealModal}
        onClickMeal={setMeal}
        recentMeals={recentMeals}
      />
    </form>
  );
};
