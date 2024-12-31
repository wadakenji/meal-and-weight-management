'use client';

import { FC } from 'react';
import { signInAction } from '@/app/actions/sign-in';

const Page: FC = () => {
  return (
    <main>
      <form action={signInAction}>
        <label>
          email
          <input type="text" name="email" />
        </label>
        <label>
          password
          <input type="password" name="password" />
        </label>
        <button type="submit">submit</button>
      </form>
    </main>
  );
};

export default Page;
