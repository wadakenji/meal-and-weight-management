import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { dateToDateColumnValue, getYesterday } from '@/utils/date';
import {
  stepRecordToStepRecordProps,
  stepRecordRowToStepRecord,
} from '@/libs/supabase/interface/step-record';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';

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

  const res = await supabaseClient
    .from('step_records')
    .select('step')
    .eq('user_id', userId)
    .eq('date', dateToDateColumnValue(getYesterday()))
    .maybeSingle();

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'step-record',
      function: 'getYesterdayStep',
    });
  }

  return res.data && res.data.step;
};
