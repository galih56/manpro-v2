import { axios } from '@/lib/axios';

import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from '@/lib/react-query';

import storage from '@/utils/storage';


export const logout = (): Promise<any> => {
  return axios.post(`/auth/logout`);
};

type UseLoginOptions = {
  config?: MutationConfig<typeof logout>;
};

export const useLogout = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    onMutate: async (response) => {
        storage.clearToken();
        window.location.assign(window.location.origin as unknown as string);
    },
    ...config,
    mutationFn: logout,
  });
};