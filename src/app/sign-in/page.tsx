import { FC } from 'react';
import { signInAction } from '@/app/actions/sign-in';
import { Form } from '@/components/form/form-base/form-base';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { SIGN_IN_FORM_VALUE_NAMES } from '@/helpers/form/sign-in';

type Props = {
  searchParams: Promise<{ error?: string }>;
};

const Page: FC<Props> = async ({ searchParams }) => {
  const errorMessage = (await searchParams).error;
  return (
    <main className="p-16px">
      <Form action={signInAction}>
        <div className="mb-24px space-y-16px">
          <LabelInputSet
            labelText="メールアドレス"
            type="text"
            name={SIGN_IN_FORM_VALUE_NAMES.EMAIL}
            required
          />
          <LabelInputSet
            labelText="パスワード"
            type="password"
            name={SIGN_IN_FORM_VALUE_NAMES.PASSWORD}
            required
          />
        </div>
        <FormSubmitButton>ログイン</FormSubmitButton>
        {errorMessage && (
          <p className="mt-16px text-center text-attention">{errorMessage}</p>
        )}
      </Form>
    </main>
  );
};

export default Page;
