import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  headingText: string;
  className?: string;
}>;

export const PanelFrame: FC<Props> = ({ headingText, className, children }) => {
  return (
    <div className={clsx('rounded border border-line p-16px', className)}>
      <h2 className="mb-8px text-center text-sm font-bold">{headingText}</h2>
      {children}
    </div>
  );
};
