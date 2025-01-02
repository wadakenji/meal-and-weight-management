import { FC } from 'react';
import { registerWeightAction } from '@/app/actions/register-weight';
import { formatDateInputValue } from '@/utils/date';
import { WEIGHT_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { Form } from '@/components/form/form-base/form-base';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';

export const WeightForm: FC = () => {
  return (
    <Form action={registerWeightAction}>
      <div className="mb-24px space-y-16px">
        <LabelInputSet
          labelText="日付"
          type="date"
          name={WEIGHT_FORM_VALUE_NAMES.DATE}
          defaultValue={formatDateInputValue(new Date())}
          required
        />
        <LabelInputSet
          labelText="体重（kg）"
          type="number"
          name={WEIGHT_FORM_VALUE_NAMES.WEIGHT}
          required
        />
      </div>
      <FormSubmitButton />
    </Form>
  );
};
