'use client';

import { FC } from 'react';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';
import { signOutAction } from '@/app/actions/sign-out';
import { useFormStatus } from 'react-dom';

const Button: FC = () => {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton className="w-full" disabled={pending} pending={pending}>
      ログアウト
    </PrimaryButton>
  );
};

type Props = {
  className?: string;
};

export const SignOutButton: FC<Props> = ({ className }) => {
  return (
    <form action={signOutAction} className={className}>
      <Button />
    </form>
  );
};
