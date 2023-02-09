import { axios } from '@/lib/axios';

import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/auth/login', data)
                .then(res => ({ 
                  accessToken : res.data.access_token, 
                  user : res.data.user
                }));
};


export const login = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post(`/auth/login`, data);
};

type UseLoginOptions = {
  config?: MutationConfig<typeof login>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    onMutate: async (response) => {
      await queryClient.cancelQueries('login');
      return response;
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData('login', context.previousDiscussions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('login');
    },
    ...config,
    mutationFn: login,
  });
};