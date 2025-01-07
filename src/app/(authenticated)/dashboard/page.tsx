import { FC } from 'react';
import { AuthenticatedTemplate } from '../_components/template/authenticated-template/authenticated-template';
import { getTodayWeight } from '@/usecase/weight-record';
import { getYesterdayStep } from '@/usecase/step-record';
import { getTodayTotalEnergy } from '@/usecase/meal';
import { getUserCache } from '@/app/_cache/getUser';
import { TodayWeightPanel } from '@/app/(authenticated)/dashboard/_components/weight/today-weight-panel';
import { YesterdayStepPanel } from '@/app/(authenticated)/dashboard/_components/step/yesterday-step-panel';

const Page: FC = async () => {
  const user = await getUserCache();
  if (!user) return null;

  const todayWeightPromise = getTodayWeight(user.id);
  const yesterdayStepPromise = getYesterdayStep(user.id);
  const todayTotalEnergyPromise = getTodayTotalEnergy(user.id);

  return (
    <AuthenticatedTemplate pageTitle="ホーム">
      <div className="mb-16px flex items-baseline gap-x-8px">
        <YesterdayStepPanel yesterdayStepPromise={yesterdayStepPromise} />
        <TodayWeightPanel todayWeightPromise={todayWeightPromise} />
      </div>
    </AuthenticatedTemplate>
  );
};

export default Page;
