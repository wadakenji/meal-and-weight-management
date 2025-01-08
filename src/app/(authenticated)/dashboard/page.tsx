import { FC } from 'react';
import { AuthenticatedTemplate } from '../_components/template/authenticated-template/authenticated-template';
import { getTodayWeight } from '@/usecase/weight-record';
import { getYesterdayStep } from '@/usecase/step-record';
import { getTodayTotalEnergy } from '@/usecase/meal';
import { TodayWeightPanel } from '@/app/(authenticated)/dashboard/_components/weight/today-weight-panel';
import { YesterdayStepPanel } from '@/app/(authenticated)/dashboard/_components/step/yesterday-step-panel';
import { TodayTotalEnergyPanel } from '@/app/(authenticated)/dashboard/_components/meal/today-total-energy-panel';
import { getSession } from '@/usecase/authentication';

const Page: FC = async () => {
  const session = await getSession();
  if (!session) return null;

  const todayWeightPromise = getTodayWeight(session.userId);
  const yesterdayStepPromise = getYesterdayStep(session.userId);
  const todayTotalEnergyPromise = getTodayTotalEnergy(session.userId);

  return (
    <AuthenticatedTemplate pageTitle="ホーム">
      <div className="mb-8px flex items-baseline gap-x-8px">
        <YesterdayStepPanel yesterdayStepPromise={yesterdayStepPromise} />
        <TodayWeightPanel todayWeightPromise={todayWeightPromise} />
      </div>
      <TodayTotalEnergyPanel
        todayTotalEnergyPromise={todayTotalEnergyPromise}
      />
    </AuthenticatedTemplate>
  );
};

export default Page;
