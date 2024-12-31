import { FC } from 'react';
import { updateUserAction } from '@/app/actions/update-user';

const Page: FC = async () => {
  return (
    <main>
      <form action={updateUserAction} className="flex flex-col">
        <label>
          名前：
          <input type="text" name="name" />
        </label>
        <label>
          パスワード：
          <input type="password" name="password" />
        </label>
        <label>
          基礎代謝：
          <input
            type="number"
            name="basal_metabolism_rate"
            defaultValue="1000"
          />
          kcal
        </label>
        <label>
          1歩あたりの消費エネルギー：
          <input type="number" name="energy_per_step" defaultValue="0.03" />
          kcal
        </label>
        <button type="submit">登録</button>
      </form>
    </main>
  );
};

export default Page;
