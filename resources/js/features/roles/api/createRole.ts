import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Role } from '../types';

export type CreateRoleDTO = {
  data: {
    name: string;
    code: string;
  };
};

export const createRole = ({ data }: CreateRoleDTO): Promise<Role> => {
  return axios.post(`/roles`, data);
};

type UseCreateRoleOptions = {
  config?: MutationConfig<typeof createRole>;
};

export const useCreateRole = ({ config }: UseCreateRoleOptions = {}) => {
  const { add } = useNotifications();
  return useMutation({
    onMutate: async (newRole) => {
      await queryClient.cancelQueries(['roles']);

      const previousRoles = queryClient.getQueryData<Role[]>(['roles']);

      queryClient.setQueryData(['roles'], [...(previousRoles || []), newRole.data]);

      return { previousRoles };
    },
    onError: (_, __, context: any) => {
      if (context?.previousRoles) {
        queryClient.setQueryData(['roles'], context.previousRoles);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
      add({
        type: 'success',
        title: 'Role Created',
      });
    },
    ...config,
    mutationFn: createRole,
  });
};
