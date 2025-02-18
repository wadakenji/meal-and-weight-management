import { Database } from '@/types/supabase';

type WeightRecordRow = Database['public']['Tables']['weight_records']['Row'];
type WeightRecordProps =
  Database['public']['Tables']['weight_records']['Insert'];

export const weightRecordRowToWeightRecord = (
  weightRecordRow: WeightRecordRow,
): WeightRecord => {
  return {
    userId: weightRecordRow.user_id,
    date: weightRecordRow.date,
    weight: weightRecordRow.weight,
  };
};

export const weightRecordToWeightRecordProps = (
  weightRecord: WeightRecord,
): WeightRecordProps => {
  return {
    user_id: weightRecord.userId,
    date: weightRecord.date,
    weight: weightRecord.weight,
  };
};
