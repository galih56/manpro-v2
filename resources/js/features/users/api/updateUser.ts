import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/lib/authentication';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';
import { User } from '../types';
import { Option } from '@/components/Form';

export type UpdateUserDTO = {
  data: {
    email : string;
    name : string;
    roles : Array<Option>;
  };
  userId: string;
};

export const updateUser = ({
  data,
  userId,
}: UpdateUserDTO): Promise<User> => {
  return axios.patch(`/users/${userId}`, data);
};


type UseUpdateUserOptions = {
  config?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {
  const { add } = useNotifications();
  const { refetch : refetchUser } = useAuth();
  return useMutation({
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
