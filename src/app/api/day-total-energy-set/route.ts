import { NextRequest } from 'next/server';
import { getEnergyGroupByDate } from '@/usecase/meal';

export type DayTotalEnergySetResponseData = {
  date: string;
  totalEnergy: number;
}[];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('user-id');
  const startDate = searchParams.get('start-date');
  const endDate = searchParams.get('end-date');

  if (!userId || !startDate || !endDate) {
    const responseData: DayTotalEnergySetResponseData = [];
    return Response.json(responseData);
  }

  const totalEnergyList = await getEnergyGroupByDate(
    userId,
    startDate,
    endDate,
  );

  const responseData: DayTotalEnergySetResponseData = totalEnergyList;
  return Response.json(responseData);
}
