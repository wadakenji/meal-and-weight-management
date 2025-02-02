import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import {
  dateStringToDate,
  datetimeColumnValueToDate,
  dateToDateColumnValue,
  dateToDatetimeColumnValue,
  getEachDates,
  getRangeOfDate,
  isSameDay,
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

export const getEnergyGroupByDate = async (
  userId: string,
  startDateString: string,
  endDateString: string,
): Promise<{ date: string; totalEnergy: number }[]> => {
  const supabaseClient = await createSupabaseServerClient();

  const startDate = dateStringToDate(startDateString, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  const endDate = dateStringToDate(endDateString, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  const [startDatetime] = getRangeOfDate(startDate, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  const [, endDatetime] = getRangeOfDate(endDate, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });

  const res = await supabaseClient
    .from('meals')
    .select()
    .eq('user_id', userId)
    .gte('datetime', dateToDatetimeColumnValue(startDatetime))
    .lte('datetime', dateToDatetimeColumnValue(endDatetime));

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'meal',
      function: 'getEnergyGroupByDate',
    });
  }

  const dates = getEachDates(startDate, endDate, {
    timezone: TIMEZONE.ASIA_TOKYO,
  });

  return dates.map((date) => {
    const mealRows = res.data.filter((row) =>
      isSameDay(date, datetimeColumnValueToDate(row.datetime)),
    );
    const totalEnergy = mealRows.reduce(
      (acc, row) => acc + row.amount_of_energy,
      0,
    );
    return { date: dateToDateColumnValue(date), totalEnergy };
  });
};
