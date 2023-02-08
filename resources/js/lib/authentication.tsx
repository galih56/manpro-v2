import { configureAuth, } from 'react-query-auth';

import { Spinner } from '@/components/Elements';
import {
  loginWithEmailAndPassword,
  getAuthenticatedUserInfo,
  registerWithEmailAndPassword,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from '@/features/auth';
import storage from '@/utils/storage';
import { useEffect, useState } from 'react';

async function handleUserResponse(data : any) {
  const { access_token, token_type, user } = data;
  storage.setToken(`${token_type} ${access_token}`);
  return user;
}

async function userFn() {
  if (storage.getToken()) {
    const response = await getAuthenticatedUserInfo();
    return response;
  }
  return null;
}

// async function userFn() {
//   if (storage.getToken()) {
//     try {
//       const response = await getAuthenticatedUserInfo();
//       return response; 
//     } catch (error) {
//       toast.error(error?.message)
//       return null;
//     }
//   }
//   return null;
// }

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
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

export const { useUser : useAuthQuery, useLogin, useLogout, useRegister, AuthLoader } = configureAuth<
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
  const { data, error, refetch, status, isLoading, fetchStatus, isFetching, isError, isFetched } = useAuthQuery();
  const [ auth, setAuth ] = useState<AuthUser>(initialState)

  useEffect(()=>{
    if(status == "success" && data !== null && data !== undefined){
      setAuth(data)
    }else{
      setAuth(initialState);
    }
  }, [ data ])

  return {
    auth, error, refetch, status, isLoading, isFetching, isError, isFetched 
  }
}
