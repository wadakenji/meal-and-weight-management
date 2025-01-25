import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import {
  dateStringToDate,
  dateToDatetimeColumnValue,
  getRangeOfDate,
} from '@/utils/date';
import { mealRowToMeal, mealToMealProps } from '@/libs/supabase/interface/meal';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import { TIMEZONE } from '@/constants/timezone';

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
    throw new UsecaseDbError({ module: 'meal', function: 'registerMeal' });
  }

  return mealRowToMeal(res.data);
};

export const getMealsByDate = async (
  userId: string,
  dateString: string,
): Promise<Meal[]> => {
  const supabaseClient = await createSupabaseServerClient();

  const date = dateStringToDate(dateString, { timezone: TIMEZONE.ASIA_TOKYO });
  const [startOfDate, endOfDate] = getRangeOfDate(date, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });

  const res = await supabaseClient
    .from('meals')
    .select()
    .eq('user_id', userId)
    .gte('datetime', dateToDatetimeColumnValue(startOfDate))
    .lte('datetime', dateToDatetimeColumnValue(endOfDate));

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'meal',
      function: 'getMealsByDate',
    });
  }

  return res.data.map(mealRowToMeal);
};

export const getTodayTotalEnergy = async (userId?: string) => {
  const supabaseClient = await createSupabaseServerClient();

  if (userId === undefined) {
    const res = await supabaseClient.auth.getUser();
    if (res.error) {
      console.error(res.error);
      throw new UsecaseAuthError({
        module: 'meal',
        function: 'getTodayTotalEnergy',
      });
    }
    userId = res.data.user.id;
  }

  const [startOfDate, endOfDate] = getRangeOfDate(new Date(), {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  const res = await supabaseClient
    .from('meals')
    .select('amount_of_energy')
    .eq('user_id', userId)
    .gte('datetime', dateToDatetimeColumnValue(startOfDate))
    .lte('datetime', dateToDatetimeColumnValue(endOfDate));

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'meal',
      function: 'getTodayTotalEnergy',
    });
  }

  return res.data.reduce(
    (acc, { amount_of_energy }) => acc + amount_of_energy,
    0,
  );
};
