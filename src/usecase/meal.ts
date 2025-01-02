import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { formatToDatetimeColumnValue, getRangeOfDate } from '@/utils/date';

export const registerMeal = async (props: {
  userId: string;
  datetime: Date;
  name: string;
  amountOfEnergy: number;
  amountOfProtein: number | null;
}) => {
  const supabaseClient = await createSupabaseServerClient();
  await supabaseClient
    .from('meals')
    .insert({
      user_id: props.userId,
      datetime: formatToDatetimeColumnValue(props.datetime),
      name: props.name,
      amount_of_energy: props.amountOfEnergy,
      amount_of_protein: props.amountOfProtein,
    })
    .then((res) => {
      if (res.error) throw res.error;
    });
};

export const getTodayTotalEnergy = async (userId: string) => {
  const supabaseClient = await createSupabaseServerClient();
  const [startOfDate, endOfDate] = getRangeOfDate(new Date());
  const res = await supabaseClient
    .from('meals')
    .select('amount_of_energy')
    .eq('user_id', userId)
    .gte('datetime', formatToDatetimeColumnValue(startOfDate))
    .lte('datetime', formatToDatetimeColumnValue(endOfDate));

  if (res.error) throw res.error;

  return res.data.reduce(
    (acc, { amount_of_energy }) => acc + amount_of_energy,
    0,
  );
};
