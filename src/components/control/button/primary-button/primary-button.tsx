import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: 'outlined' | 'filled';
};

export const PrimaryButton: FC<Props> = ({
  className,
  children,
  style = 'outlined',
  ...props
}) => {
  return (
    <button
      className={clsx(
        'block min-h-min-button-size min-w-[200px] rounded-lg',
        style === 'outlined' && 'border border-primary text-primary',
        style === 'filled' && 'bg-primary text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
