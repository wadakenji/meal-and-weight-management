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

export const getWeightRecord = async (
  userId: string,
  date: string,
): Promise<WeightRecord | null> => {
  const supabaseClient = await createSupabaseServerClient();

  const res = await supabaseClient
    .from('weight_records')
    .select()
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'weight-record',
      function: 'getWeightRecord',
    });
  }

  return (
    res.data && {
      userId: res.data.user_id,
      date: res.data.date,
      weight: res.data.weight,
    }
  );
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

  const weightRecord = await getWeightRecord(userId, todayString);

  return weightRecord && weightRecord.weight;
};

export const getWeightRecords = async (
  userId?: string,
  fromDate?: string | null,
  toDate?: string | null,
): Promise<WeightRecord[]> => {
  const supabaseClient = await createSupabaseServerClient();

  if (userId === undefined) {
    const res = await supabaseClient.auth.getUser();
    if (res.error) {
      console.error(res.error);
      throw new UsecaseAuthError({
        module: 'weight-record',
        function: 'getWeightRecords',
      });
    }
    userId = res.data.user.id;
  }

  if (!fromDate) {
    fromDate = dateToDateColumnValue(getOneMonthAgoDate(), {
      timezone: TIMEZONE.ASIA_TOKYO,
    });
  }

  if (!toDate) {
    toDate = dateToDateColumnValue(new Date(), {
      timezone: TIMEZONE.ASIA_TOKYO,
    });
  }

  const res = await supabaseClient
    .from('weight_records')
    .select('*')
    .eq('user_id', userId)
    .gte('date', fromDate)
    .lte('date', toDate)
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
