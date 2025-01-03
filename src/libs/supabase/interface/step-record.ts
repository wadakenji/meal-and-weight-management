import { Database } from '@/types/supabase';
import { dateColumnValueToDate, dateToDateColumnValue } from '@/utils/date';

type StepRecordRow = Database['public']['Tables']['step_records']['Row'];
type StepRecordProps = Database['public']['Tables']['step_records']['Insert'];

export const supabaseStepRecordToStepRecord = (
  stepRecordRow: StepRecordRow,
): StepRecord => {
  return {
    userId: stepRecordRow.user_id,
    date: dateColumnValueToDate(stepRecordRow.date),
    step: stepRecordRow.step,
  };
};

export const stepRecordToSupabaseStepRecordProps = (
  stepRecord: StepRecord,
): StepRecordProps => {
  return {
    user_id: stepRecord.userId,
    date: dateToDateColumnValue(stepRecord.date),
    step: stepRecord.step,
  };
};
