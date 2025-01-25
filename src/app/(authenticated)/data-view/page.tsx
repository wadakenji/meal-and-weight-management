import { FC, Suspense } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { IconSpinner } from '@/components/icon/spinner';
import { getRelatedUsers } from '@/usecase/user-group';
import { DataView } from '@/app/(authenticated)/data-view/_components/data-view/data-view';

const Page: FC = async () => {
  const usersPromise = getRelatedUsers();

  return (
    <AuthenticatedTemplate pageTitle="データ表示">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <DataView usersPromise={usersPromise} />
      </Suspense>
    </AuthenticatedTemplate>
  );
};

export default Page;
