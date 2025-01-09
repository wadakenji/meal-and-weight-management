'use client';

import { FC } from 'react';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';
import { signOutAction } from '@/app/actions/sign-out';
import { useFormStatus } from 'react-dom';
import { IconSpinner } from '@/components/icon/spinner';

const Button: FC = () => {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton className="min-w-[150px]" disabled={pending}>
      {pending ? (
        <IconSpinner mxAuto color="primary" />
      ) : (
        <span>ログアウト</span>
      )}
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
