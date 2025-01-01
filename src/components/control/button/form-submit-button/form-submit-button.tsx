'use client';

import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const FormSubmitButton: FC<Props> = ({ children }) => {
  return (
    <button
      type="submit"
      className="mx-auto block min-h-min-button-size min-w-[200px] rounded-lg bg-primary font-bold text-white"
    >
      {children || '登録する'}
    </button>
  );
};
