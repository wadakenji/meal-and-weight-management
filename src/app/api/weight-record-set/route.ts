import { NextRequest } from 'next/server';
import { getWeightRecords } from '@/usecase/weight-record';

export type WeightRecordSetResponseData = WeightRecord[];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('user-id');
  const fromDate = searchParams.get('from-date');
  const toDate = searchParams.get('to-date');

  if (!userId) {
    const responseData: WeightRecordSetResponseData = [];
    return Response.json(responseData);
  }

  const weightRecords = await getWeightRecords(userId, fromDate, toDate);

  const responseData: WeightRecordSetResponseData = weightRecords;
  return Response.json(responseData);
}
