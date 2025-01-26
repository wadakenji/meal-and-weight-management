import { NextRequest } from 'next/server';
import { getLastOneMonthWeightRecords } from '@/usecase/weight-record';

export type WeightRecordSetResponseData = WeightRecord[];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('user-id');

  if (!userId) {
    const responseData: WeightRecordSetResponseData = [];
    return Response.json(responseData);
  }

  const weightRecords = await getLastOneMonthWeightRecords(userId);

  const responseData: WeightRecordSetResponseData = weightRecords;
  return Response.json(responseData);
}
