'use client';

import { FC, useState } from 'react';
import { updateUserAction } from '@/app/actions/update-user';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { USER_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { Form } from '@/components/form/form-base/form-base';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';

type Props = {
  user: User;
};

export const UserForm: FC<Props> = ({ user }) => {
  const [showsPasswordInput, setShowsPasswordInput] = useState(
    user.name === undefined,
  );

  return (
    <Form action={updateUserAction}>
      <div className="mb-24px space-y-16px">
        <LabelInputSet
          labelText="名前"
          type="text"
          name={USER_FORM_VALUE_NAMES.NAME}
          defaultValue={user.name}
          required
        />
        <LabelInputSet
          labelText="基礎代謝（kcal）"
          type="number"
          name={USER_FORM_VALUE_NAMES.BASAL_METABOLISM_RATE}
          defaultValue={user.basalMetabolismRate || 1000}
          required
        />
        <LabelInputSet
          labelText="1歩あたりの消費エネルギー（kcal）"
          type="number"
          name={USER_FORM_VALUE_NAMES.ENERGY_PER_STEP}
          defaultValue={user.energyPerStep || 0.03}
          step={0.01}
          required
        />
        {showsPasswordInput ? (
          <LabelInputSet
            labelText="パスワード"
            type="password"
            name={USER_FORM_VALUE_NAMES.PASSWORD}
          />
        ) : (
          <PrimaryButton
            className="mx-auto"
            type="button"
            onClick={() => setShowsPasswordInput(true)}
          >
            パスワードを変更する
          </PrimaryButton>
        )}
      </div>
      <FormSubmitButton />
    </Form>
  );
};
