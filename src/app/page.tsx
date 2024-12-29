import { FC } from 'react';
import Link from 'next/link';
import { getUser } from '@/usecase/user';

const Page: FC = async () => {
  const user = await getUser();

  if (!user) return <Link href="/sign-in">ログインしてください。</Link>;

  return <div>ログイン中：{user.email}</div>;
};

export default Page;
