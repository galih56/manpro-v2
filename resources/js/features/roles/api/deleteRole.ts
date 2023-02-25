import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Role } from '../types';

export const deleteRole = ({ roleId }: { roleId: string }) => {
  return axios.delete(`/roles/${roleId}`);
};

type UseDeleteRoleOptions = {
  config?: MutationConfig<typeof deleteRole>;
};

export const useDeleteRole = ({ config }: UseDeleteRoleOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (deletedRole) => {
      await queryClient.cancelQueries(['roles']);

      const previousRoles = queryClient.getQueryData<Role[]>(['roles']);

      queryClient.setQueryData(
        ['roles'],
        previousRoles?.filter(
          (role) => role.id !== deletedRole.roleId
        )
      );

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
        title: 'Role Deleted',
      });
    },
    ...config,
    mutationFn: deleteRole,
  });
};
