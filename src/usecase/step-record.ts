import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { formatToDateColumnValue } from '@/utils/date';

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
