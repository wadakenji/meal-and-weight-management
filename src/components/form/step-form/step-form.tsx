import { FC } from 'react';
import { registerStepAction } from '@/app/actions';
import { formatDateInputValue, getYesterday } from '@/utils/date';

export const StepForm: FC = () => {
  return (
    <form action={registerStepAction}>
      <label>
        日付：
        <input
          type="date"
          name="date"
          defaultValue={formatDateInputValue(getYesterday())}
        />
      </label>
      <label>
        歩数：
        <input type="number" name="step" />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};
