'use client';

import { FC } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckIconButton } from '@/components/control/button/check-icon-button/check-icon-button';

export const FormSubmitCheckIconButton: FC = () => {
  const { pending } = useFormStatus();
  return (
    <CheckIconButton type="submit" isPending={pending} disabled={pending} />
  );
};
