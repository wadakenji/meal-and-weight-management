'use client';

import { FC, use } from 'react';
import { WeightChart } from '@/app/(authenticated)/data-view/_components/weight-chart/weight-chart';

type Props = {
  userDataPromise: Promise<
    {
      userId: string;
      username: string;
      weightRecords: WeightRecord[];
    }[]
  >;
};

export const UserDataList: FC<Props> = ({ userDataPromise }) => {
  const userDataList = use(userDataPromise);

  return (
    <>
      {userDataList.map(({ userId, username, weightRecords }) => (
        <div key={userId} className="mb-24px">
          <h3 className="mb-4px text-lg font-bold">{username}の体重グラフ</h3>
          <WeightChart weightRecords={weightRecords} />
        </div>
      ))}
    </>
  );
};
