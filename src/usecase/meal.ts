import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDatetimeColumnValue, getRangeOfDate } from '@/utils/date';
import { mealRowToMeal, mealToMealProps } from '@/libs/supabase/interface/meal';

export const registerMeal = async (meal: MealToCreate) => {
  const supabaseClient = await createSupabaseServerClient();
  const props = mealToMealProps(meal);
  const res = await supabaseClient
    .from('meals')
    .insert(props)
    .select()
    .single();

  if (res.error) {
    console.error(res.error);
    throw new Error('usecase: registerMeal');
  }

  return mealRowToMeal(res.data);
};

export const getTodayTotalEnergy = async (userId: string) => {
  const supabaseClient = await createSupabaseServerClient();
  const [startOfDate, endOfDate] = getRangeOfDate(new Date());
  const res = await supabaseClient
    .from('meals')
    .select('amount_of_energy')
    .eq('user_id', userId)
    .gte('datetime', dateToDatetimeColumnValue(startOfDate))
    .lte('datetime', dateToDatetimeColumnValue(endOfDate));

  if (res.error) {
    console.error(res.error);
    throw new Error('usecase: getTodayTotalEnergy');
  }

  return res.data.reduce(
    (acc, { amount_of_energy }) => acc + amount_of_energy,
    0,
  );
};
