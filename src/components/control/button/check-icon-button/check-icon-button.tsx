import { IconSpinner } from '@/components/icon/spinner';
import { ButtonHTMLAttributes, FC } from 'react';
import { IconCheck } from '@/components/icon/check';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  isPending: boolean;
};

export const CheckIconButton: FC<Props> = ({ isPending, ...props }) => {
  return (
    <button
      className="mx-auto flex size-min-button-size items-center justify-center rounded-full bg-primary"
      {...props}
    >
      {!isPending ? <IconCheck /> : <IconSpinner />}
    </button>
  );
};
