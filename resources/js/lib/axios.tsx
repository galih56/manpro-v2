import Axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import { API_URL } from '@/config';
import { useNotifications } from '@/stores/notifications';
import storage from '@/utils/storage';
import { useEffect } from 'react';
import { HTTPErrorResponse } from '@/types';
import toast from 'react-hot-toast';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  config.headers = { ...config.headers } as AxiosHeaders;
  if (token) {
    config.headers.set("Authorization",`${token}`);
  }
  config.headers.set("Accept",'application/json');
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});


const AxiosInterceptor = ({ children } : any) => {
  const { add } = useNotifications();

  useEffect(() => {
      const resInterceptor = (response : any) => {
          return response;
      }

      const errInterceptor = (error : any) => {
        var status : string = "";
        var message : string = "Ooops, omething went wrong!";
        
        if(Axios.isAxiosError(error)){
          status = error.response?.status?.toString() || "";
          message = `${error.message}`;
        }else{
          status = error.response?.status?.toString() || error?.status || "";
          message = error.response?.data?.message || error.message;
        }

        add({
          type: 'error',
          title: 'Error',
          message,
        })
        toast.error(message);
        return Promise.reject(error);
      }


      const interceptor = axios.interceptors.response.use(resInterceptor, errInterceptor);

      return () => axios.interceptors.response.eject(interceptor);

  }, [])

  return children;
}


export default axios;
export { AxiosInterceptor }