import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Role } from '../types';

export const getRole = ({ roleId }: { roleId: string }): Promise<Role> => {
  return axios.get(`/roles/${roleId}`).then(res => res.data);
};

type QueryFnType = typeof getRole;

type UseRoleOptions = {
  roleId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useRole = ({ roleId, config }: UseRoleOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['role', roleId],
    queryFn: () => getRole({ roleId }),
  });
};
