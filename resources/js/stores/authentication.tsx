import React, {createContext ,useReducer,useContext, ReactNode, ElementType, useEffect} from 'react';
import { useAuthQuery } from '@/lib/auth';

type AuthType = {
  id: string | null,
  name : string,
  email: string,
  loggedIn : Boolean,
};

const initialState : AuthType= {
  id: null,
  name : "",
  email: "",
  loggedIn : false,
};

interface Props {
  children?: ReactNode
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
  const userQuery = useAuthQuery();
  
  useEffect(()=>{
    if(userQuery.status === "success" && userQuery.data !== null){ 
      const { data } = userQuery;
      const authenticatedUser : AuthType = {
        id : data.id,
        name : data.name,
        email : data.email,
        loggedIn : true
      }
      dispatch({  
        type : 'store', 
        payload : authenticatedUser
      })
    }
  }, [ userQuery.data ]);

  return(
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return {
    auth : context.state,
    authDispatch : context.dispatch,
  }
}



export {initialState, AuthProvider, AuthContext, authReducer, useAuth, withAuth};