import { FC, use } from 'react';
import { DashboardDataText } from '@/app/(authenticated)/dashboard/_components/data-text/data-text';
import { getRecentMeals, getTodayTotalEnergy } from '@/usecase/meal';
import { registerMealAction } from '@/app/actions/register-meal';
import { MealRegisterForm } from '@/app/(authenticated)/dashboard/_components/meal/meal-register-form';

export const EnergyDisplayAndMealForm: FC = () => {
  const todayTotalEnergy = use(getTodayTotalEnergy());
  const recentMeals = use(getRecentMeals());

  const action = async (formData: FormData) => {
    'use server';
    await registerMealAction(null, formData);
  };

  return (
    <>
      <DashboardDataText unitText={'kcal'} value={todayTotalEnergy} />
      <MealRegisterForm registerMealAction={action} recentMeals={recentMeals} />
    </>
  );
};
