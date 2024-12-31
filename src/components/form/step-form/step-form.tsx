import { FC } from 'react';
import { registerStepAction } from '@/app/actions/register-step';
import { formatDateInputValue, getYesterday } from '@/utils/date';
import { STEP_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const StepForm: FC = () => {
  return (
    <form action={registerStepAction}>
      <label>
        日付：
        <input
          type="date"
          name={STEP_FORM_VALUE_NAMES.DATE}
          defaultValue={formatDateInputValue(getYesterday())}
        />
      </label>
      <label>
        歩数：
        <input type="number" name={STEP_FORM_VALUE_NAMES.STEP} />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};
