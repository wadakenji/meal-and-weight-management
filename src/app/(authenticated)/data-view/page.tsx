import { FC } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';

const Page: FC = () => {
  return (
    <AuthenticatedTemplate pageTitle="グラフ表示">グラフ</AuthenticatedTemplate>
  );
};

export default Page;
