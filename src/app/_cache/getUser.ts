import { cache } from 'react';
import { getUser } from '@/usecase/user';

export const getUserCache = cache(getUser);
