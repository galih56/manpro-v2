import { axios } from '@/lib/axios';

export const logout = (): Promise<any> => {
  return axios.post(`/auth/logout`);
};
