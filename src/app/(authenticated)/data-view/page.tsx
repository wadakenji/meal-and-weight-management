import { FC, Suspense } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { getLastOneMonthWeightRecords } from '@/usecase/weight-record';
import { WeightChart } from '@/app/(authenticated)/data-view/_components/weight-chart/weight-chart';
import { IconSpinner } from '@/components/icon/spinner';

const Page: FC = async () => {
  const weightRecordsPromise = getLastOneMonthWeightRecords();

  return (
    <AuthenticatedTemplate pageTitle="グラフ表示">
      <h2 className="mb-8px font-bold">体重</h2>
      <Suspense fallback={<IconSpinner mxAuto />}>
        <WeightChart weightRecordsPromise={weightRecordsPromise} />
      </Suspense>
    </AuthenticatedTemplate>
  );
};

export default Page;
