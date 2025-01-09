'use client';

import { FC } from 'react';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';
import { signOutAction } from '@/app/actions/sign-out';
import { useFormStatus } from 'react-dom';

const Button: FC = () => {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton
      className="min-w-[150px]"
      disabled={pending}
      pending={pending}
    >
      ログアウト
    </PrimaryButton>
  );
};

export const SignOutButton: FC = () => {
  return (
    <form action={signOutAction}>
      <Button />
    </form>
  );
};
