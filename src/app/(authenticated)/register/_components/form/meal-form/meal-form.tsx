import { FC } from 'react';
import { registerMealAction } from '@/app/actions/register-meal';
import { formatDatetimeInputValue } from '@/utils/date';
import { MEAL_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { Form } from '@/components/form/form-base/form-base';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';

export const MealForm: FC = () => {
  return (
    <Form action={registerMealAction}>
      <div className="mb-24px space-y-16px">
        <LabelInputSet
          labelText="日時"
          type="datetime-local"
          name={MEAL_FORM_VALUE_NAMES.DATETIME}
          defaultValue={formatDatetimeInputValue(new Date())}
          required
        />
        <LabelInputSet
          labelText="食べたもの"
          type="text"
          name={MEAL_FORM_VALUE_NAMES.NAME}
          required
        />
        <LabelInputSet
          labelText="カロリー（kcal）"
          type="number"
          name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_ENERGY}
          required
        />
        <LabelInputSet
          labelText="タンパク質（g）"
          type="number"
          name={MEAL_FORM_VALUE_NAMES.AMOUNT_OF_PROTEIN}
        />
      </div>
      <FormSubmitButton />
    </Form>
  );
};