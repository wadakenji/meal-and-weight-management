import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDateColumnValue, dateColumnValueToDate } from '@/utils/date';

export const registerWeightRecord = async (props: {
  userId: string;
  date: Date;
  weight: number;
}): Promise<WeightRecord> => {
  const supabaseClient = await createSupabaseServerClient();
  const res = await supabaseClient
    .from('weight_records')
    .upsert(
      {
        user_id: props.userId,
        date: dateToDateColumnValue(props.date),
        weight: props.weight,
      },
      { onConflict: 'user_id,date' },
    )
    .select()
    .single();

  if (res.error) throw res.error;

  return {
    userId: res.data.user_id,
    date: dateColumnValueToDate(res.data.date),
    weight: res.data.weight,
  };
};

export const getTodayWeight = async (userId: string) => {
  const supabaseClient = await createSupabaseServerClient();
  const res = await supabaseClient
    .from('weight_records')
    .select('weight')
    .eq('user_id', userId)
    .eq('date', dateToDateColumnValue(new Date()))
    .maybeSingle();

  if (res.error) throw res.error;

  return res.data && res.data.weight;
};
