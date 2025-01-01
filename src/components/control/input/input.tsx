import { FC, HTMLProps } from 'react';

type Props = Omit<HTMLProps<HTMLInputElement>, 'className'>;

export const Input: FC<Props> = (props) => {
  return (
    <input
      className="w-full rounded border border-line px-16px py-8px focus-visible:outline-primary-light"
      {...props}
    />
  );
};
