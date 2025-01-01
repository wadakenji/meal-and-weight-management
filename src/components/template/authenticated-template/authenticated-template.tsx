import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const AuthenticatedTemplate: FC<Props> = ({ children }) => {
  return <main className="mt-header-height p-16px">{children}</main>;
};
