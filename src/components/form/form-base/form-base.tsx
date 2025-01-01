import { FC, HTMLProps } from 'react';
import clsx from 'clsx';

type Props = HTMLProps<HTMLFormElement>;

export const Form: FC<Props> = ({ children, className, ...props }) => {
  return (
    <form
      className={clsx(
        'rounded-lg border border-line bg-white p-16px',
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};
