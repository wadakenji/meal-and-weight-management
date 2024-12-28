import { FC } from 'react';
import { getUser } from '@/usecase/authentication';
import Link from 'next/link';

const Page: FC = async () => {
  const user = await getUser();

  if (!user) return <Link href="/sign-in">ログインしてください。</Link>;

  return <div>ログイン中：{user.email}</div>;
};

export default Page;
