import { FC, use } from 'react';
import { DashboardDataText } from '@/app/(authenticated)/dashboard/_components/data-text/data-text';
import { Input } from '@/components/control/input/input';
import { STEP_FORM_VALUE_NAMES } from '@/helpers/form/register-step-record-form';
import { dateToDateInputValue, getYesterday } from '@/utils/date';
import { getYesterdayStep } from '@/usecase/step-record';
import { registerStepAction } from '@/app/actions/register-step';
import { FormSubmitCheckIconButton } from '@/components/control/button/form-submit-button/form-submit-check-icon-button';

export const YesterdayStepForm: FC = () => {
  const yesterdayStep = use(getYesterdayStep());
  const action = async (formData: FormData) => {
    'use server';
    await registerStepAction(null, formData);
  };

  return (
    <>
      {yesterdayStep !== null ? (
        <DashboardDataText unitText="歩" value={yesterdayStep} />
      ) : (
        <form action={action}>
          <div className="mb-8px flex items-end gap-x-8px">
            <Input name={STEP_FORM_VALUE_NAMES.STEP} type="number" required />
            <span className="font-bold">歩</span>
          </div>
          <FormSubmitCheckIconButton />
          <input
            name={STEP_FORM_VALUE_NAMES.DATE}
            type="hidden"
            value={dateToDateInputValue(getYesterday())}
          />
        </form>
      )}
    </>
  );
};
