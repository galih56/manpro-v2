import { axios } from '@/lib/axios';

import { AuthUser } from '../types';

export const getAuthenticatedUserInfo = (): Promise<AuthUser> => {
  return axios.post('/auth/me');
};
