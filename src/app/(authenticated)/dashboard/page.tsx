import { FC } from 'react';
import { AuthenticatedTemplate } from '../_components/template/authenticated-template/authenticated-template';
import { getTodayWeight } from '@/usecase/weight-record';
import { getTodayTotalEnergy } from '@/usecase/meal';
import { TodayWeightPanel } from '@/app/(authenticated)/dashboard/_components/weight/today-weight-panel';
import { YesterdayStepPanel } from '@/app/(authenticated)/dashboard/_components/step/yesterday-step-panel';
import { TodayTotalEnergyPanel } from '@/app/(authenticated)/dashboard/_components/meal/today-total-energy-panel';

const Page: FC = async () => {
  const todayWeightPromise = getTodayWeight();
  const todayTotalEnergyPromise = getTodayTotalEnergy();

  return (
    <AuthenticatedTemplate pageTitle="ホーム">
      <div className="mb-8px flex items-baseline gap-x-8px">
        <YesterdayStepPanel />
        <TodayWeightPanel todayWeightPromise={todayWeightPromise} />
      </div>
      <TodayTotalEnergyPanel
        todayTotalEnergyPromise={todayTotalEnergyPromise}
      />
    </AuthenticatedTemplate>
  );
};

export default Page;
