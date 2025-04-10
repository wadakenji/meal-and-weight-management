'use client';

import { FC, use, useActionState, useState } from 'react';
import { updateUserAction } from '@/app/actions/update-user';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { Form } from '@/components/form/form-base/form-base';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';
import { USER_FORM_VALUE_NAMES } from '@/helpers/form/update-user-form';

type Props = {
  userPromise: Promise<User | null>;
};

export const UserForm: FC<Props> = ({ userPromise }) => {
  const user = use(userPromise);

  const isFirstRegister = !!user && user.name === undefined;
  const [showsPasswordInput, setShowsPasswordInput] = useState(isFirstRegister);
  const [state, formAction, isPending] = useActionState(updateUserAction, null);

  if (!user) return null;

  return (
    <Form action={formAction}>
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
          step={0.01}
          required
        />
        <LabelInputSet
          labelText="1歩あたりの消費エネルギー（kcal）"
          type="number"
          name={USER_FORM_VALUE_NAMES.ENERGY_PER_STEP}
          defaultValue={user.energyPerStep || 0.03}
          step={0.001}
          required
        />
        {showsPasswordInput ? (
          <LabelInputSet
            labelText="パスワード"
            type="password"
            name={USER_FORM_VALUE_NAMES.PASSWORD}
            placeholder="半角英数字8文字以上"
            required={isFirstRegister}
          />
        ) : (
          <PrimaryButton
            className="mx-auto w-[200px]"
            type="button"
            onClick={() => setShowsPasswordInput(true)}
          >
            パスワードを変更する
          </PrimaryButton>
        )}
      </div>
      <FormSubmitButton />
      {state?.error && !isPending && (
        <p className="mt-16px text-center text-attention">{state.error}</p>
      )}
      {state?.updatedUser && !isPending && (
        <p className="mt-16px text-center text-primary">登録が完了しました。</p>
      )}
    </Form>
  );
};
