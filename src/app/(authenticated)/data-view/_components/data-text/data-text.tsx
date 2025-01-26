import { FC } from 'react';
import clsx from 'clsx';

type Props = {
  title: string;
  value: number | undefined;
  unit: string;
  className?: string;
};

export const DataText: FC<Props> = ({ title, value, unit, className }) => {
  return (
    <div className={clsx('text-center font-bold', className)}>
      <div className="mb-8px text-sm">{title}</div>
      <div className="whitespace-nowrap text-2xl">
        {value !== undefined ? (
          <>
            <span className="mr-4px text-3xl">{value.toLocaleString()}</span>
            <span className="text-sm">{unit}</span>
          </>
        ) : (
          <span className="align-middle text-text-gray-light">未登録</span>
        )}
      </div>
    </div>
  );
};
