import { Database } from '@/types/supabase';
import {
  datetimeColumnValueToDate,
  dateToDatetimeColumnValue,
} from '@/utils/date';

type MealRow = Database['public']['Tables']['meals']['Row'];
type MealProps = Database['public']['Tables']['meals']['Insert'];

export const mealRowToMeal = (mealRow: MealRow): Meal => {
  return {
    id: mealRow.id,
    userId: mealRow.user_id,
    datetime: datetimeColumnValueToDate(mealRow.datetime),
    name: mealRow.name,
    amountOfEnergy: mealRow.amount_of_energy,
    amountOfProtein: mealRow.amount_of_protein,
  };
};

export const mealToMealProps = (meal: MealToCreate): MealProps => {
  return {
    user_id: meal.userId,
    datetime: dateToDatetimeColumnValue(meal.datetime),
    name: meal.name,
    amount_of_energy: meal.amountOfEnergy,
    amount_of_protein: meal.amountOfProtein,
  };
};
