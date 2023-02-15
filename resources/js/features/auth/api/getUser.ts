import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

import { UserResponse } from '../types';

export const getAuthenticatedUserInfo = (): Promise<UserResponse> => {
  return axios.get('/auth/me')
    .then(res => ({
        accessToken : res.data?.access_token,
        user : res.data?.user
    }));
};
