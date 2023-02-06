import { axios } from '@/lib/axios';
import { UserResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return axios.post('/auth/register', data)
                .then(res => ({ 
                  accessToken : res.data.access_token, 
                  user : res.data.user
                }));
};
