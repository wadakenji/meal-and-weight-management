'use client';

import { FC } from 'react';
import { signInAction } from '@/app/actions/sign-in';
import { SIGN_IN_FORM_VALUE_NAMES } from '@/constants/form-input-name';

const Page: FC = () => {
  return (
    <main>
      <form action={signInAction}>
        <label>
          email
          <input type="text" name={SIGN_IN_FORM_VALUE_NAMES.EMAIL} />
        </label>
        <label>
          password
          <input type="password" name={SIGN_IN_FORM_VALUE_NAMES.PASSWORD} />
        </label>
        <button type="submit">submit</button>
      </form>
    </main>
  );
};

export default Page;
