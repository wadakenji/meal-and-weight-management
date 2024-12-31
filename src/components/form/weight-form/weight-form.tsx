import { FC } from 'react';
import { registerWeightAction } from '@/app/actions/register-weight';
import { formatDateInputValue } from '@/utils/date';
import { WEIGHT_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const WeightForm: FC = () => {
  return (
    <form action={registerWeightAction}>
      <label>
        日付：
        <input
          type="date"
          name={WEIGHT_FORM_VALUE_NAMES.DATE}
          defaultValue={formatDateInputValue(new Date())}
        />
      </label>
      <label>
        体重（kg）：
        <input type="number" name="weight" />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};
