import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { formatToDateColumnValue, getYesterday } from '@/utils/date';

export const registerStepRecord = async (props: {
  userId: string;
  date: Date;
  step: number;
}) => {
  const supabaseClient = await createSupabaseServerClient();
  await supabaseClient
    .from('step_records')
    .insert({
      user_id: props.userId,
      date: formatToDateColumnValue(props.date),
      step: props.step,
    })
    .then((res) => {
      if (res.error) throw res.error;
    });
};

export const getYesterdayStep = async (userId: string) => {
  const supabaseClient = await createSupabaseServerClient();
  const res = await supabaseClient
    .from('step_records')
    .select('step')
    .eq('user_id', userId)
    .eq('date', formatToDateColumnValue(getYesterday()))
    .maybeSingle();

  if (res.error) throw res.error;

  return res.data && res.data.step;
};
