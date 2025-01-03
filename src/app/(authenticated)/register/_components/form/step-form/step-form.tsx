import { FC } from 'react';
import { dateToDateInputValue, getYesterday } from '@/utils/date';
import { Form } from '@/components/form/form-base/form-base';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { STEP_FORM_VALUE_NAMES } from '@/helpers/form/register-step-record-form';

type Props = {
  registerStepAction: (formData: FormData) => void;
};

export const StepForm: FC<Props> = ({ registerStepAction }) => {
  return (
    <Form action={registerStepAction}>
      <div className="mb-24px space-y-16px">
        <LabelInputSet
          labelText="日付"
          type="date"
          name={STEP_FORM_VALUE_NAMES.DATE}
          defaultValue={dateToDateInputValue(getYesterday())}
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
