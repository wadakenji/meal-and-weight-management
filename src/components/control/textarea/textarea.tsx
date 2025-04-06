import { FC, HTMLProps } from 'react';

type Props = Omit<HTMLProps<HTMLTextAreaElement>, 'className'>;

export const Textarea: FC<Props> = (props) => {
  return (
    <textarea
      className="w-full rounded border border-line px-16px py-8px focus-visible:outline-primary-light"
      {...props}
    />
  );
};
