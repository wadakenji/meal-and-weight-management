import { FC, Suspense } from 'react';
import { PanelFrame } from '@/app/(authenticated)/dashboard/_components/panel-frame/panel-frame';
import { TodayWeightForm } from '@/app/(authenticated)/dashboard/_components/weight/today-weight-form';
import { IconSpinner } from '@/components/icon/spinner';

type Props = {
  todayWeightPromise: Promise<number | null>;
};

export const TodayWeightPanel: FC<Props> = ({ todayWeightPromise }) => {
  return (
    <PanelFrame headingText="今日の体重" className="flex-1">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <TodayWeightForm todayWeightPromise={todayWeightPromise} />
      </Suspense>
    </PanelFrame>
  );
};
