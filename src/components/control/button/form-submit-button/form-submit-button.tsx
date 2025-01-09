'use client';

import { FC, PropsWithChildren } from 'react';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';
import { useFormStatus } from 'react-dom';

type Props = PropsWithChildren;

export const FormSubmitButton: FC<Props> = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton
      style="filled"
      type="submit"
      className="mx-auto disabled:opacity-30"
      pending={pending}
      disabled={pending}
    >
      {children || '登録する'}
    </PrimaryButton>
  );
};
