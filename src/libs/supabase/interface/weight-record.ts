import { Database } from '@/types/supabase';
import { dateColumnValueToDate, dateToDateColumnValue } from '@/utils/date';

type WeightRecordRow = Database['public']['Tables']['weight_records']['Row'];
type WeightRecordProps =
  Database['public']['Tables']['weight_records']['Insert'];

export const supabaseWeightRecordToWeightRecord = (
  weightRecordRow: WeightRecordRow,
): WeightRecord => {
  return {
    userId: weightRecordRow.user_id,
    date: dateColumnValueToDate(weightRecordRow.date),
    weight: weightRecordRow.weight,
  };
};

export const weightRecordToSupabaseWeightRecordProps = (
  weightRecord: WeightRecord,
): WeightRecordProps => {
  return {
    user_id: weightRecord.userId,
    date: dateToDateColumnValue(weightRecord.date),
    weight: weightRecord.weight,
  };
};
