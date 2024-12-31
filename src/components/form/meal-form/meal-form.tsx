import { FC } from 'react';
import { registerMealAction } from '@/app/actions/register-meal';
import { formatDatetimeInputValue } from '@/utils/date';
import { MEAL_FORM_VALUE_NAMES } from '@/constants/form-input-name';

export const MealForm: FC = () => {
  return (
    <form action={registerMealAction}>
      <label>
        日時：
        <input
          type="datetime-local"
          name={MEAL_FORM_VALUE_NAMES.DATETIME}
          defaultValue={formatDatetimeInputValue(new Date())}
          required
        />
      </label>
      <label>
        名前：
        <input type="text" name={MEAL_FORM_VALUE_NAMES.NAME} required />
      </label>
      <label>
        カロリー（kcal）：
        <input
          type="number"
          name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_ENERGY}
          required
        />
      </label>
      <label>
        タンパク質（g）：
        <input type="number" name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_PROTEIN} />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};
