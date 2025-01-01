import { FC } from 'react';
import { updateUserAction } from '@/app/actions/update-user';
import { USER_FORM_VALUE_NAMES } from '@/constants/form-input-name';
import { AuthenticatedTemplate } from '@/components/template/authenticated-template/authenticated-template';

const Page: FC = async () => {
  return (
    <AuthenticatedTemplate>
      <form action={updateUserAction} className="flex flex-col">
        <label>
          名前：
          <input type="text" name={USER_FORM_VALUE_NAMES.NAME} />
        </label>
        <label>
          パスワード：
          <input type="password" name={USER_FORM_VALUE_NAMES.PASSWORD} />
        </label>
        <label>
          基礎代謝：
          <input
            type="number"
            name={USER_FORM_VALUE_NAMES.BASAL_METABOLISM_RATE}
            defaultValue="1000"
          />
          kcal
        </label>
        <label>
          1歩あたりの消費エネルギー：
          <input
            type="number"
            name={USER_FORM_VALUE_NAMES.ENERGY_PER_STEP}
            defaultValue="0.03"
          />
          kcal
        </label>
        <button type="submit">登録</button>
      </form>
    </AuthenticatedTemplate>
  );
};

export default Page;
