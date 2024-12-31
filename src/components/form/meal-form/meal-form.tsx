import { FC } from 'react';
import { registerMealAction } from '@/app/actions/register-meal';
import { formatDatetimeInputValue } from '@/utils/date';

export const MealForm: FC = () => {
  return (
    <form action={registerMealAction}>
      <label>
        日時：
        <input
          type="datetime-local"
          name="datetime"
          defaultValue={formatDatetimeInputValue(new Date())}
          required
        />
      </label>
      <label>
        名前：
        <input type="text" name="name" required />
      </label>
      <label>
        カロリー（kcal）：
        <input type="number" name="amount_of_energy" required />
      </label>
      <label>
        タンパク質（g）：
        <input type="number" name="amount_of_protein" />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};
