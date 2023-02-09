import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

import { UserResponse } from '../types';

export const getAuthenticatedUserInfo = (): Promise<UserResponse> => {
  return axios.post('/auth/me');
};



type QueryFnType = typeof getAuthenticatedUserInfo;


export const useUser = ( config : QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['auth'],
    queryFn: () => getAuthenticatedUserInfo(),
  });
};

