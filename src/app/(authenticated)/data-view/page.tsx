import { FC, Suspense } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { getLastOneMonthWeightRecords } from '@/usecase/weight-record';
import { IconSpinner } from '@/components/icon/spinner';
import { getBelongingUserGroups } from '@/usecase/user-group';
import { UserDataList } from '@/app/(authenticated)/data-view/_components/user-data-list/user-data-list';

// todo データの見せ方検討
const Page: FC = async () => {
  const userDataPromise = getBelongingUserGroups().then((userGroups) => {
    const users = userGroups[0].users;
    return Promise.all(
      users.map(async ({ id, name }) => ({
        userId: id,
        username: name,
        weightRecords: await getLastOneMonthWeightRecords(id),
      })),
    );
  });

  return (
    <AuthenticatedTemplate pageTitle="グラフ表示">
      <Suspense fallback={<IconSpinner mxAuto />}>
        <UserDataList userDataPromise={userDataPromise} />
      </Suspense>
    </AuthenticatedTemplate>
  );
};

export default Page;
