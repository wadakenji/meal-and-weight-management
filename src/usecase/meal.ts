import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { formatToDatetimeColumnValue } from '@/utils/date';

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
