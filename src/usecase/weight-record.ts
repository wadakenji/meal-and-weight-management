import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDateColumnValue, getOneMonthAgoDate } from '@/utils/date';
import {
  weightRecordRowToWeightRecord,
  weightRecordToWeightRecordProps,
} from '@/libs/supabase/interface/weight-record';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import { TIMEZONE } from '@/constants/timezone';

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
    throw new UsecaseDbError({
      module: 'weight-record',
      function: 'registerWeightRecord',
    });
  }

  return weightRecordRowToWeightRecord(res.data);
};

export const getTodayWeight = async (userId?: string) => {
  const supabaseClient = await createSupabaseServerClient();

  if (userId === undefined) {
    const res = await supabaseClient.auth.getUser();
    if (res.error) {
      console.error(res.error);
      throw new UsecaseAuthError({
        module: 'weight-record',
        function: 'getTodayWeight',
      });
    }
    userId = res.data.user.id;
  }

  const todayString = dateToDateColumnValue(new Date(), {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  const res = await supabaseClient
    .from('weight_records')
    .select('weight')
    .eq('user_id', userId)
    .eq('date', todayString)
    .maybeSingle();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'weight-record',
      function: 'getTodayWeight',
    });
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
      throw new UsecaseAuthError({
        module: 'weight-record',
        function: 'getLastOneMonthWeightRecords',
      });
    }
    userId = res.data.user.id;
  }

  const todayString = dateToDateColumnValue(new Date(), {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  const oneMonthAgoString = dateToDateColumnValue(getOneMonthAgoDate(), {
    timezone: TIMEZONE.ASIA_TOKYO,
  });

  const res = await supabaseClient
    .from('weight_records')
    .select('*')
    .eq('user_id', userId)
    .gt('date', oneMonthAgoString)
    .lte('date', todayString)
    .order('date');

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'weight-record',
      function: 'getLastOneMonthWeightRecords',
    });
  }

  return res.data.map((row) => weightRecordRowToWeightRecord(row));
};
