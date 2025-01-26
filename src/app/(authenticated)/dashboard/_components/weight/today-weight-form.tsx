import { FC, use } from 'react';
import { DashboardDataText } from '@/app/(authenticated)/dashboard/_components/data-text/data-text';
import { Input } from '@/components/control/input/input';
import { dateToDateInputValue } from '@/utils/date';
import { WEIGHT_FORM_VALUE_NAMES } from '@/helpers/form/register-weight-record-form';
import { getTodayWeight } from '@/usecase/weight-record';
import { registerWeightAction } from '@/app/actions/register-weight';
import { FormSubmitCheckIconButton } from '@/components/control/button/form-submit-button/form-submit-check-icon-button';
import { TIMEZONE } from '@/constants/timezone';

export const TodayWeightForm: FC = () => {
  const todayWeight = use(getTodayWeight());
  const action = async (formData: FormData) => {
    'use server';
    await registerWeightAction(null, formData);
  };

  return (
    <>
      {todayWeight !== null ? (
        <DashboardDataText unitText="kg" value={todayWeight} />
      ) : (
        <form action={action}>
          <div className="mb-8px flex items-end gap-x-8px">
            <Input
              name={WEIGHT_FORM_VALUE_NAMES.WEIGHT}
              type="number"
              step={0.01}
              required
            />
            <span className="font-bold">kg</span>
          </div>
          <FormSubmitCheckIconButton />
          <input
            name={WEIGHT_FORM_VALUE_NAMES.DATE}
            type="hidden"
            value={dateToDateInputValue(new Date(), {
              timezone: TIMEZONE.ASIA_TOKYO,
            })}
          />
        </form>
      )}
    </>
  );
};
