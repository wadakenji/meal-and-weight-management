'use client';

import { AuthenticatedTemplate } from '@/app/(authenticated)/_components/template/authenticated-template/authenticated-template';

export default function Error() {
  return (
    <AuthenticatedTemplate pageTitle="エラー">
      <p>予期せぬエラーが発生しました。</p>
      <p>
        再度操作したり、ログインし直しても解消しない場合は、開発者にご連絡ください。
      </p>
    </AuthenticatedTemplate>
  );
}
