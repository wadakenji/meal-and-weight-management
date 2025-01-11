import { FC, Suspense } from 'react';
import { PanelFrame } from '@/app/(authenticated)/dashboard/_components/panel-frame/panel-frame';
import { IconSpinner } from '@/components/icon/spinner';
import { EnergyDisplayAndMealForm } from '@/app/(authenticated)/dashboard/_components/meal/energy-display-and-meal-form';

type Props = {
  todayTotalEnergyPromise: Promise<number>;
};

export const TodayTotalEnergyPanel: FC<Props> = ({
  todayTotalEnergyPromise,
}) => {
  return (
    <PanelFrame headingText="今日の合計カロリー">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <EnergyDisplayAndMealForm
          todayTotalEnergyPromise={todayTotalEnergyPromise}
        />
      </Suspense>
    </PanelFrame>
  );
};
