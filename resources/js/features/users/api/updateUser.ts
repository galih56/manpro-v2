import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/lib/authentication';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';
import { User } from '../types';
import { Option } from '@/components/Form';

export type UpdateUserDTO = {
  data: {
    email : string;
    name : string;
    roles : Option[];
  };
  userId: string;
};

export const updateUser = ({
  data,
  userId,
}: UpdateUserDTO): Promise<User> => {
  if(data.roles){
    data.roles = data.roles.map((role : any) => role.value);
  }
  return axios.patch(`/users/${userId}`, data);
};


type UseUpdateUserOptions = {
  config?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {
  const { add } = useNotifications();
  const { refetch : refetchUser } = useAuth();
  return useMutation({
    onMutate: async (updatingUser: any) => {
      if(updatingUser.roles){
        updatingUser.roles = updatingUser.roles.map((item : any) => ({
          id : item.value,
          name : item.label
        }));
      }
      await queryClient.cancelQueries(['users', updatingUser?.userId]);

      const previousUser = queryClient.getQueryData<User>([
        'users',
        updatingUser?.userId,
      ]);
      
      queryClient.setQueryData(['users', updatingUser?.userId], {
        ...previousUser,
        ...updatingUser.data,
        id: updatingUser.userId,
      });

      return { previousUser };
    },
    onSuccess: () => {
      add({
        type : 'success',
        title : 'message'
      })
      refetchUser();
    },
    ...config,
    mutationFn: updateUser,
  });
};
