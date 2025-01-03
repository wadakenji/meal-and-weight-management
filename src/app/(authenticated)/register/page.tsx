import { FC } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { getTodayWeight } from '@/usecase/weight-record';
import { getYesterdayStep } from '@/usecase/step-record';
import { getUserCache } from '@/app/_cache/getUser';
import { getTodayTotalEnergy } from '@/usecase/meal';
import { DataViewAndForms } from '@/app/(authenticated)/register/_components/data-view-and-forms/data-view-and-forms';

const Page: FC = async () => {
  const user = await getUserCache();
  if (!user) return null;

  const todayWeight = await getTodayWeight(user.id);
  const yesterdayStep = await getYesterdayStep(user.id);
  const todayTotalEnergy = await getTodayTotalEnergy(user.id);

  return (
    <AuthenticatedTemplate pageTitle="データ登録">
      <DataViewAndForms
        initialValue={{ todayWeight, yesterdayStep, todayTotalEnergy }}
      />
    </AuthenticatedTemplate>
  );
};

export default Page;
