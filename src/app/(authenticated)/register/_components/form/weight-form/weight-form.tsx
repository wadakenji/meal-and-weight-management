import { FC } from 'react';
import { dateToDateInputValue } from '@/utils/date';
import { Form } from '@/components/form/form-base/form-base';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { WEIGHT_FORM_VALUE_NAMES } from '@/helpers/form/register-weight-record-form';
import { registerWeightAction } from '@/app/actions/register-weight';
import { TIMEZONE } from '@/constants/timezone';

export const WeightForm: FC = () => {
  const action = async (formData: FormData) => {
    'use server';
    await registerWeightAction(null, formData);
  };

  return (
    <Form action={action}>
      <div className="mb-24px space-y-16px">
        <LabelInputSet
          labelText="日付"
          type="date"
          name={WEIGHT_FORM_VALUE_NAMES.DATE}
          defaultValue={dateToDateInputValue(new Date(), {
            timezone: TIMEZONE.ASIA_TOKYO,
          })}
          required
        />
        <LabelInputSet
          labelText="体重（kg）"
          type="number"
          name={WEIGHT_FORM_VALUE_NAMES.WEIGHT}
          step={0.01}
          required
        />
      </div>
      <FormSubmitButton />
    </Form>
  );
};
