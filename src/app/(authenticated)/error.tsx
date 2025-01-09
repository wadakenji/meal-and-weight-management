'use client';

import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';
import { PrimaryButton } from '@/components/control/button/primary-button/primary-button';
import { SignOutButton } from '@/app/(authenticated)/_components/sign-out-button/sign-out-button';

export default function Error() {
  return (
    <AuthenticatedTemplate pageTitle="エラー">
      <p className="mb-8px text-lg font-bold">予期せぬエラーが発生しました。</p>
      <p className="mb-16px">
        再度操作したり、ログインし直しても解消しない場合は、開発者にご連絡ください。
      </p>
      <div className="flex gap-x-8px">
        <PrimaryButton
          className="basis-1/2"
          onClick={() => window.location.reload()}
        >
          再読み込み
        </PrimaryButton>
        <SignOutButton className="basis-1/2" />
      </div>
    </AuthenticatedTemplate>
  );
}
