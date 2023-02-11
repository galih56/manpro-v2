import { axios } from '@/lib/axios';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};


export const login = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post(`/auth/login`, data)
                .then(res => ({ 
                  accessToken : res.data.access_token, 
                  user : {
                    ...res.data.user,
                    authenticated : true
                  }
                }));
};
