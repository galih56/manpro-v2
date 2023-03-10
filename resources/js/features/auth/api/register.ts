import { axios } from '@/lib/axios';
import { UserResponse } from '../types';
import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
};

export const register = (data: RegisterCredentialsDTO): Promise<UserResponse> => {
  return axios.post(`/auth/register`, data)
                .then(res => ({ 
                  accessToken : res.data.access_token, 
                  user : {
                    ...res.data.user,
                    authenticated : true
                  }
                }));
};

type UseRegisterOption = {
  config?: MutationConfig<typeof register>;
};

export const useRegister = ({ config }: UseRegisterOption = {}) => {
  return useMutation({
    onMutate: async (response) => {
      await queryClient.cancelQueries('register');
      return response;
    },
    ...config,
    mutationFn: register,
  });
};