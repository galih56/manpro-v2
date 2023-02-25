import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { User } from '../types';

export type CreateUserDTO = {
  data: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    roles? : [];
  };
};

export const createUser = ({ data }: CreateUserDTO): Promise<User> => {
  return axios.post(`/users`, data);
};

type UseCreateUserOptions = {
  config?: MutationConfig<typeof createUser>;
};

export const useCreateUser = ({ config }: UseCreateUserOptions = {}) => {
  const { add } = useNotifications();
  return useMutation({
    onMutate: async (newUser) => {
      await queryClient.cancelQueries(['users']);

      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      console.log(newUser)
      queryClient.setQueryData(['users'], [...(previousUsers || []), newUser.data]);

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      add({
        type: 'success',
        title: 'User Created',
      });
    },
    ...config,
    mutationFn: createUser,
  });
};
