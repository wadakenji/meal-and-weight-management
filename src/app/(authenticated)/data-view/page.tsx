import { FC } from 'react';
import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { getUserCache } from '@/app/_cache/getUser';
import { getLastOneMonthWeightRecords } from '@/usecase/weight-record';
import { dateToDateInputValue } from '@/utils/date';

const Page: FC = async () => {
  const user = await getUserCache();
  if (!user) return null;

  const weightRecords = await getLastOneMonthWeightRecords(user.id);

  return (
    <AuthenticatedTemplate pageTitle="グラフ表示">
      <p>工事中…</p>
      {weightRecords.map(({ date, weight }) => (
        <p key={date.toISOString()}>
          {dateToDateInputValue(date)}：{weight} kg
        </p>
      ))}
    </AuthenticatedTemplate>
  );
};

export default Page;
