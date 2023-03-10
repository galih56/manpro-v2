import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Role } from '../types';

export const getRoles = (): Promise<Role[]> => {
  return axios.get('/roles').then(res => res.data);
};

type QueryFnType = typeof getRoles;

type UseRolesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useRoles = ({ config = {} }: UseRolesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  });
};
