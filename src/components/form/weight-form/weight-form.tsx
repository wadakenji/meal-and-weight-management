import { FC } from 'react';
import { registerWeightAction } from '@/app/actions';
import { formatDateInputValue } from '@/utils/date';

export const WeightForm: FC = () => {
  return (
    <form action={registerWeightAction}>
      <label>
        日付：
        <input
          type="date"
          name="date"
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
