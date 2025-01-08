import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDateColumnValue, getOneMonthAgoDate } from '@/utils/date';
import {
  weightRecordRowToWeightRecord,
  weightRecordToWeightRecordProps,
} from '@/libs/supabase/interface/weight-record';

export const registerWeightRecord = async (
  weightRecord: WeightRecord,
): Promise<WeightRecord> => {
  const supabaseClient = await createSupabaseServerClient();

  const props = weightRecordToWeightRecordProps(weightRecord);
  const res = await supabaseClient
    .from('weight_records')
    .upsert(props, { onConflict: 'user_id,date' })
    .select()
    .single();

  if (res.error) {
    console.error(res.error);
    throw new Error('usecase: registerWeightRecord');
  }

  return weightRecordRowToWeightRecord(res.data);
};

export const getTodayWeight = async (userId?: string) => {
  const supabaseClient = await createSupabaseServerClient();

  if (userId === undefined) {
    const res = await supabaseClient.auth.getUser();
    if (res.error) {
      console.error(res.error);
      throw new Error('usecase: getTodayWeight');
    }
    userId = res.data.user.id;
  }

  const res = await supabaseClient
    .from('weight_records')
    .select('weight')
    .eq('user_id', userId)
    .eq('date', dateToDateColumnValue(new Date()))
    .maybeSingle();

  if (res.error) {
    console.error(res.error);
    throw new Error('usecase: getTodayWeight');
  }

  return res.data && res.data.weight;
};

export const getLastOneMonthWeightRecords = async (
  userId?: string,
): Promise<WeightRecord[]> => {
  const supabaseClient = await createSupabaseServerClient();

  if (userId === undefined) {
    const res = await supabaseClient.auth.getUser();
    if (res.error) {
      console.error(res.error);
      throw new Error('usecase: getLastOneMonthWeightRecords');
    }
    userId = res.data.user.id;
  }

  const today = new Date();
  const oneMonthAgo = getOneMonthAgoDate();

  const res = await supabaseClient
    .from('weight_records')
    .select('*')
    .eq('user_id', userId)
    .gt('date', dateToDateColumnValue(oneMonthAgo))
    .lte('date', dateToDateColumnValue(today))
    .order('date');

  if (res.error) {
    console.error(res.error);
    throw new Error('usecase: getLastOneMonthWeightRecords');
  }

  return res.data.map((row) => weightRecordRowToWeightRecord(row));
};
