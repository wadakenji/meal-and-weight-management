'use client';

import { FC, PropsWithChildren } from 'react';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';

type Props = PropsWithChildren;

export const FormSubmitButton: FC<Props> = ({ children }) => {
  return (
    <PrimaryButton style="filled" type="submit" className="mx-auto">
      {children || '登録する'}
    </PrimaryButton>
  );
};
