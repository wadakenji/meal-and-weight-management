import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDateColumnValue, getYesterday } from '@/utils/date';
import {
  stepRecordToStepRecordProps,
  stepRecordRowToStepRecord,
} from '@/libs/supabase/interface/step-record';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import { TIMEZONE } from '@/constants/timezone';

export const registerStepRecord = async (stepRecord: StepRecord) => {
  const supabaseClient = await createSupabaseServerClient();
  const props = stepRecordToStepRecordProps(stepRecord);
  const res = await supabaseClient
    .from('step_records')
    .upsert(props, { onConflict: 'user_id,date' })
    .select()
    .single();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'step-record',
      function: 'registerStepRecord',
    });
  }

  return stepRecordRowToStepRecord(res.data);
};

export const getStepRecord = async (
  userId: string,
  date: string,
): Promise<StepRecord | null> => {
  const supabaseClient = await createSupabaseServerClient();

  const res = await supabaseClient
    .from('step_records')
    .select()
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'step-record',
      function: 'getStepRecord',
    });
  }

  return (
    res.data && {
      userId: res.data.user_id,
      date: res.data.date,
      step: res.data.step,
    }
  );
};

export const getYesterdayStep = async (userId?: string) => {
  const supabaseClient = await createSupabaseServerClient();

  if (userId === undefined) {
    const res = await supabaseClient.auth.getUser();
    if (res.error) {
      console.error(res.error);
      throw new UsecaseAuthError({
        module: 'step-record',
        function: 'getYesterdayStep',
      });
    }
    userId = res.data.user.id;
  }

  const yesterdayString = dateToDateColumnValue(getYesterday(), {
    timezone: TIMEZONE.ASIA_TOKYO,
  });
  const stepRecord = await getStepRecord(userId, yesterdayString);

  return stepRecord && stepRecord.step;
};
