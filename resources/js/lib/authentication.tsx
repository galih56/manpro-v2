import { Spinner } from '@/components/Elements';
import {
  login,
  getAuthenticatedUserInfo,
  register,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from '@/features/auth';
import storage from '@/utils/storage';
import { configureAuth } from 'react-query-auth';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

async function handleUserResponse(data: UserResponse) {
  if(data.accessToken) storage.setToken(data.accessToken);
  return data.user;
}

async function userFn() {
  if (storage.getToken()) {
    const data = await getAuthenticatedUserInfo();
    const user = await handleUserResponse(data);
    return user;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await login(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await register(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthLoader, useUser, useLogin, useLogout, useRegister } = configureAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);


const initialState : AuthUser = {
  id : "",
  email : "",
  name : "",
  authenticated : false
} 

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { data , error, refetch, status, isLoading, fetchStatus, isFetching, isError, isFetched, remove, isStale } = useUser({
    // I don't use initialData, useQuery always returns initialData on mount and gets the data only on tab focus!
    useErrorBoundary: true,
    refetchOnWindowFocus: true,
    retry: false,
    // should be refetched in the background every 8 hours
    staleTime: 1000 * 60 * 8 ,
    onError : (error : any)=>{
      console.log(error.response,queryClient.getDefaultOptions())
      return Promise.resolve(error);
    }
  });
  const isAuthenticated = data !== null && data !== undefined && data?.email;

  const [ auth, setAuth ] = useState<AuthUser>(initialState)
  
  useEffect(()=>{
    if(isAuthenticated){
      setAuth({
        id : data.id,
        email : data.email,
        name : data.name,
        authenticated : true
      })
    }else{
      setAuth(initialState);
    }
  }, [ data ])

  return {
    auth, 
    error, 
    refetch, 
    status, 
    fetchStatus, 
    isLoading, 
    isFetching, 
    isError, 
    isFetched , 
    remove,
    isAuthenticated,
    isStale
  }
}