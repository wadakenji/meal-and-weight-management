import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  pageTitle: string;
}>;

export const AuthenticatedTemplate: FC<Props> = ({ pageTitle, children }) => {
  return (
    <main className="mt-header-height p-16px">
      <h2 className="mb-16px text-page-title font-bold">{pageTitle}</h2>
      {children}
    </main>
  );
};
