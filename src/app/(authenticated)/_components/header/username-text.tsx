'use client';

import { FC, use } from 'react';

type Props = {
  userPromise: Promise<User | null>;
};

export const UsernameText: FC<Props> = ({ userPromise }) => {
  const user = use(userPromise);
  return user && <span>{user.name}</span>;
};
