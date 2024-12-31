import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { formatToDateColumnValue } from '@/utils/date';

export const registerWeightRecord = async (props: {
  userId: string;
  date: Date;
  weight: number;
}) => {
  const supabaseClient = await createSupabaseServerClient();
  await supabaseClient
    .from('weight_records')
    .insert({
      user_id: props.userId,
      date: formatToDateColumnValue(props.date),
      weight: props.weight,
    })
    .then((res) => {
      if (res.error) throw res.error;
    });
};
