import { Database } from '@/types/supabase';

type StepRecordRow = Database['public']['Tables']['step_records']['Row'];
type StepRecordProps = Database['public']['Tables']['step_records']['Insert'];

export const stepRecordRowToStepRecord = (
  stepRecordRow: StepRecordRow,
): StepRecord => {
  return {
    userId: stepRecordRow.user_id,
    date: stepRecordRow.date,
    step: stepRecordRow.step,
  };
};

export const stepRecordToStepRecordProps = (
  stepRecord: StepRecord,
): StepRecordProps => {
  return {
    user_id: stepRecord.userId,
    date: stepRecord.date,
    step: stepRecord.step,
  };
};
