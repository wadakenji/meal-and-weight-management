import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDateColumnValue } from '@/utils/date';
import {
  supabaseWeightRecordToWeightRecord,
  weightRecordToSupabaseWeightRecordProps,
} from '@/libs/supabase/interface/weight-record';

export const registerWeightRecord = async (
  weightRecord: WeightRecord,
): Promise<WeightRecord> => {
  const supabaseClient = await createSupabaseServerClient();

  const props = weightRecordToSupabaseWeightRecordProps(weightRecord);
  const res = await supabaseClient
    .from('weight_records')
    .upsert(props, { onConflict: 'user_id,date' })
    .select()
    .single();

  if (res.error) throw res.error;

  return supabaseWeightRecordToWeightRecord(res.data);
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
