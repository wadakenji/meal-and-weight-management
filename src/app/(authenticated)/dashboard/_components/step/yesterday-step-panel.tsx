import { FC, Suspense } from 'react';
import { PanelFrame } from '@/app/(authenticated)/dashboard/_components/panel-frame/panel-frame';
import { YesterdayStepForm } from '@/app/(authenticated)/dashboard/_components/step/yesterday-step-form';
import { IconSpinner } from '@/components/icon/spinner';

export const YesterdayStepPanel: FC = () => {
  return (
    <PanelFrame headingText="昨日の歩数" className="flex-1">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <YesterdayStepForm />
      </Suspense>
    </PanelFrame>
  );
};
