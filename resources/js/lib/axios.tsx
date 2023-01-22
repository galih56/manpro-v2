import Axios, { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { API_URL } from '@/config';
import { useNotifications } from '@/stores/notifications';
import storage from '@/utils/storage';

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

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotifications().dispatch({
      type: 'error',
      title: 'Error',
      message,
    })
    
    return Promise.reject(error);
  }
);