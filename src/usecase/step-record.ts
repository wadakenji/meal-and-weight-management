import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDateColumnValue, getYesterday } from '@/utils/date';
import {
  stepRecordToSupabaseStepRecordProps,
  supabaseStepRecordToStepRecord,
} from '@/libs/supabase/interface/step-record';

export const registerStepRecord = async (stepRecord: StepRecord) => {
  const supabaseClient = await createSupabaseServerClient();
  const props = stepRecordToSupabaseStepRecordProps(stepRecord);
  const res = await supabaseClient
    .from('step_records')
    .insert(props)
    .select()
    .single();

  if (res.error) throw res.error;

  return supabaseStepRecordToStepRecord(res.data);
};

export const getYesterdayStep = async (userId: string) => {
  const supabaseClient = await createSupabaseServerClient();
  const res = await supabaseClient
    .from('step_records')
    .select('step')
    .eq('user_id', userId)
    .eq('date', dateToDateColumnValue(getYesterday()))
    .maybeSingle();

  if (res.error) throw res.error;

  return res.data && res.data.step;
};
