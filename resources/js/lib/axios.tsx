import Axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import { useNotifications } from '@/stores/notifications';
import storage from '@/utils/storage';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { decamelizeKeys } from 'humps';
import { useNavigate } from 'react-router-dom';
import { wait } from '@/utils/datetime';

export const axios = Axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});

const AxiosInterceptor = ({ children } : any) => {
  // useEffect is asynchronous to children's effect, so request call might be at the same time with interceptor setup and even sooner, in that case the interceptor might not work as we expected.
  // So the solution is set a state as false initially, and set it to true after interceptor setup complete, then we return the children
  const [ isSet, setIsSet ] = useState(false);
  const { add } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
      var requestInterceptor = axios.interceptors.request.use( (config: InternalAxiosRequestConfig) => {
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
      },(error : any) => {
        var status : string = "";
        var message : string = "Ooops, omething went wrong!";

        if(error.config && error.response){
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
      });
      

      var responseInterceptor = axios.interceptors.response.use((response : AxiosResponse) => response, 
          (error : any) => {
            var status : string = "";
            var message : string = "Ooops, omething went wrong!";

            if(error.config && error.response){
              if(error.response.status === 401){
                navigate("/auth/login");
                return Promise.reject(error);
              }
              if(error.response.status === 419){
                toast.promise(
                    wait(3000).then(()=>{
                      window.location.assign(window.location.origin)
                    }),
                    {
                      loading: <span>Session expired! <br/> Refreshing page...</span>,
                      success: <b>Page refreshed</b>,
                      error: <b>Oops..something went wrong!</b>,
                    }
                 );
                
                return Promise.reject(error);
              }
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
          });
      
        setIsSet(true)
      return () => {
        setIsSet(false)
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      }
  }, [])

  return <>{isSet && children}</>;
}


export default axios;
export { AxiosInterceptor }