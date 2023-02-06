import Axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import { useNotifications } from '@/stores/notifications';
import storage from '@/utils/storage';
import { useEffect } from 'react';
import { HTTPErrorResponse } from '@/types';
import toast from 'react-hot-toast';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const axios = Axios.create({
  baseURL: API_URL,
});


axios.interceptors.request.use( (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  config.url = `${config.url}`;
  
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = token;
  }

  if (config.headers['Content-Type'] === 'multipart/form-data')
    return config;

  if (config.params) {
    config.params = decamelizeKeys(config.params);
  }
  
  if (config.data) {
    config.data = decamelizeKeys(config.data);
  }
  return config;
});

const AxiosInterceptor = ({ children } : any) => {
  const { add } = useNotifications();

  useEffect(() => {
      const resInterceptor = (response : AxiosResponse) => {
          return response;
      }

      const errInterceptor = (error : any) => {
        var status : string = "";
        var message : string = "Ooops, omething went wrong!";
        if(Axios.isAxiosError(error)){
          status = error.response?.status?.toString() || "";
          message = error.response?.data?.message || error.message;
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

      var interceptor = axios.interceptors.response.use(resInterceptor, errInterceptor);

      return () => axios.interceptors.response.eject(interceptor);

  }, [])

  return children;
}


export default axios;
export { AxiosInterceptor }