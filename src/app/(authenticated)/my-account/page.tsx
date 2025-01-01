import { FC } from 'react';
import { updateUserAction } from '@/app/actions/update-user';
import { USER_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { AuthenticatedTemplate } from '@/components/template/authenticated-template/authenticated-template';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { LabelInputSet } from '@/components/control/label-input-set/label-input-set';
import { Form } from '@/components/form/form-base/form-base';

const Page: FC = async () => {
  return (
    <AuthenticatedTemplate pageTitle="ユーザー編集">
      <Form action={updateUserAction}>
        <div className="mb-24px space-y-16px">
          <LabelInputSet
            labelText="名前"
            type="text"
            name={USER_FORM_VALUE_NAMES.NAME}
          />
          <LabelInputSet
            labelText="基礎代謝（kcal）"
            type="number"
            name={USER_FORM_VALUE_NAMES.BASAL_METABOLISM_RATE}
            defaultValue="1000"
          />
          <LabelInputSet
            labelText="1歩あたりの消費エネルギー（kcal）"
            type="number"
            name={USER_FORM_VALUE_NAMES.ENERGY_PER_STEP}
            defaultValue="0.03"
          />
          <LabelInputSet
            labelText="パスワード"
            type="password"
            name={USER_FORM_VALUE_NAMES.PASSWORD}
          />
        </div>
        <FormSubmitButton />
      </Form>
    </AuthenticatedTemplate>
  );
};

export default Page;
