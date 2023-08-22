import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Role } from '../types';

export type UpdateRoleDTO = {
  data: {
    name: string;
    code: string;
  };
  roleId: string;
};

export const updateRole = ({
  data,
  roleId,
}: UpdateRoleDTO): Promise<Role> => {
  return axios.patch(`/roles/${roleId}`, data);
};

type UseUpdateRoleOptions = {
  config?: MutationConfig<typeof updateRole>;
};

export const useUpdateRole = ({ config }: UseUpdateRoleOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingRole: any) => {

      await queryClient.cancelQueries(['roles', updatingRole?.roleId]);

      const previousRole = queryClient.getQueryData<Role>([
        'roles',
        updatingRole?.roleId,
      ]);

      queryClient.setQueryData(['roles', updatingRole?.roleId], {
        ...previousRole,
        ...updatingRole.data,
        id: updatingRole.roleId,
      });

      return { previousRole };
    },
    onError: (_, __, context: any) => {
      if (context?.previousRole) {
        queryClient.setQueryData(
          ['roles', context.previousRole.id],
          context.previousRole
        );
      }
    },
    onSuccess: (data) => {
      add({
        type: 'success',
        title: 'Role Updated',
      });
    },
    ...config,
    mutationFn: updateRole,
  });
};
