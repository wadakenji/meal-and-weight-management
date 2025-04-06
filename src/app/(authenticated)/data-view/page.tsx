import { FC, Suspense } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { IconSpinner } from '@/components/icon/spinner';
import { getRelatedUsers } from '@/usecase/user-group';
import { DataView } from '@/app/(authenticated)/data-view/_components/data-view/data-view';
import { getUserCache } from '@/app/_cache/getUser';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page: FC<Props> = async ({ searchParams }) => {
  const params = searchParams;
  const usersPromise = getRelatedUsers();
  const loggedInUserPromise = getUserCache();

  return (
    <AuthenticatedTemplate pageTitle="データ表示">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <DataView
          usersPromise={usersPromise}
          loggedInUserPromise={loggedInUserPromise}
          searchParamsPromise={params}
        />
      </Suspense>
    </AuthenticatedTemplate>
  );
};

export default Page;
