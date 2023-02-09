import { configureAuth, } from 'react-query-auth';

import { Spinner } from '@/components/Elements';
import {
  loginWithEmailAndPassword,
  getAuthenticatedUserInfo,
  registerWithEmailAndPassword,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
  useUser,
} from '@/features/auth';
import { useEffect, useState } from 'react';

const initialState : AuthUser = {
  id : "",
  email : "",
  name : "",
  authenticated : false
} 

export const useAuth = () => {
  const { data , error, refetch, status, isLoading, fetchStatus, isFetching, isError, isFetched } = useUser({
    retry: 0,
    // should be refetched in the background every 8 hours
    staleTime: 1000 * 60 * 60 * 8,
  });
  const [ auth, setAuth ] = useState<AuthUser>(initialState)

  useEffect(()=>{
    if(status == "success" && data !== null && data !== undefined){
      const { user } = data;
      setAuth({
        id : user.id,
        email : user.email,
        name : user.name,
        authenticated : true,
      })
    }else{
      setAuth(initialState);
    }
  }, [ data, status, fetchStatus, error ])

  return {
    auth, error, refetch, status, isLoading, isFetching, isError, isFetched 
  }
}
