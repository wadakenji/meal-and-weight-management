import { FC } from 'react';

type Props = {
  value: number;
  unitText: string;
};

export const DashboardDataText: FC<Props> = ({ value, unitText }) => {
  return (
    <div className="text-center font-bold">
      <span className="text-3xl">{value.toLocaleString()}</span>
      <span>{unitText}</span>
    </div>
  );
};
