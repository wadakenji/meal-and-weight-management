import { FC } from 'react';
import { updateUserAction } from '@/app/actions/update-user';

const Page: FC = async () => {
  return (
    <main>
      <form action={updateUserAction}>
        <label>
          名前：
          <input type="text" name="name" />
        </label>
        <label>
          パスワード：
          <input type="password" name="password" />
        </label>
        <button type="submit">登録</button>
      </form>
    </main>
  );
};

export default Page;
