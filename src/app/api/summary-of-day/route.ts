import { NextRequest } from 'next/server';
import { getWeightRecord } from '@/usecase/weight-record';
import { getStepRecord } from '@/usecase/step-record';
import { getMealsByDate } from '@/usecase/meal';
import { isValidDate } from '@/utils/date';

type SummaryOfDayResponseData = {
  weightRecord: WeightRecord | null;
  stepRecord: StepRecord | null;
  meals: Meal[];
  totalEnergy: number;
} | null;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [userId, date] = [
    searchParams.get('user-id'),
    searchParams.get('date'),
  ];

  if (!userId || !date || !isValidDate(new Date(date))) {
    const responseData: SummaryOfDayResponseData = null;
    return Response.json(responseData);
  }

  const weightRecord = await getWeightRecord(userId, date);
  const stepRecord = await getStepRecord(userId, date);
  const meals = await getMealsByDate(userId, date);
  const totalEnergy = meals.reduce(
    (acc, { amountOfEnergy }) => acc + amountOfEnergy,
    0,
  );

  const responseData: SummaryOfDayResponseData = {
    weightRecord,
    stepRecord,
    meals,
    totalEnergy,
  };
  return Response.json(responseData);
}
