import React, {createContext ,useReducer,useContext, ReactNode, ElementType, useEffect} from 'react';
import { useUserQuery } from '@/lib/auth';

type AuthType = {
  id: null,
  name : "",
  email: "",
  role : "",
  loggedIn : Boolean,
};

const initialState : AuthType= {
  id: null,
  name : "",
  email: "",
  role : "",
  loggedIn : false,
};

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const authReducer = (state = initialState, action : any) => {
  const { type, payload } = action;
  switch (type) {
    case 'store': {
      return {
        ...state,
        ...payload
      };
    }
    case 'update': {
      const newState={
        ...state,
        ...payload
      }
      localStorage.setItem('auth', JSON.stringify(newState));
      return newState;
    }
    case 'flush': {
      localStorage.removeItem('auth');
      return initialState;
    }
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state : AuthType,
  dispatch : React.Dispatch<any>
}>({
  state : initialState,
  dispatch : () => null
});

const withAuth = (Child : ElementType) => (props : Props) => (
  <AuthContext.Consumer>
    {(context) => <Child {...props} {...context} />}
    {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
  </AuthContext.Consumer>
);

const AuthProvider=({ children } : Props)=>{
  const [state, dispatch] = useReducer(authReducer, initialState);
  return(
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  const userQuery = useUserQuery();

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  useEffect(()=>{
    if(userQuery.status === 'success') context.dispatch({
      type : 'store',
      payload : userQuery.data
    })
  }, [ userQuery.data ]);
  return {
    auth : context.state,
    authDispatch : context.dispatch,
    ...userQuery
  }
}



export {initialState, AuthProvider, AuthContext, authReducer, useAuth, withAuth};