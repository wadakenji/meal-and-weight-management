import { FC } from 'react';
import { registerStepAction } from '@/app/actions/register-step';
import { formatDateInputValue, getYesterday } from '@/utils/date';
import { STEP_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { Form } from '@/components/form/form-base/form-base';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';

export const StepForm: FC = () => {
  return (
    <Form action={registerStepAction}>
      <div className="mb-24px space-y-16px">
        <LabelInputSet
          labelText="日付"
          type="date"
          name={STEP_FORM_VALUE_NAMES.DATE}
          defaultValue={formatDateInputValue(getYesterday())}
          required
        />
        <LabelInputSet
          labelText="歩数"
          type="number"
          name={STEP_FORM_VALUE_NAMES.STEP}
          required
        />
      </div>
      <FormSubmitButton />
    </Form>
  );
};
