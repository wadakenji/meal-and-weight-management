import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import { IconSpinner } from '@/components/icon/spinner';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: 'outlined' | 'filled';
  pending?: boolean;
};

export const PrimaryButton: FC<Props> = ({
  className,
  children,
  pending,
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
      {pending ? (
        <IconSpinner
          mxAuto
          color={style === 'outlined' ? 'primary' : 'white'}
        />
      ) : (
        children
      )}
    </button>
  );
};
