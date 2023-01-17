import React, {createContext ,useReducer,useContext, ReactNode} from 'react';

type AuthType = {
  access_token: "",
  token_type: "",
  id: null,
  name : "",
  email: "",
};

const initialState : AuthType= {
  access_token: "",
  token_type: "",
  id: null,
  name : "",
  email: "",
};

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const authReducer = (state = initialState, action : any) => {
  const { type, payload } = action;
  switch (type) {
    case 'store': {
      localStorage.setItem('auth', JSON.stringify(payload));
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

const withAuth = (Child : ReactNode) => (props : Props) => (
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
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return {
    auth : context.state,
    authDispatch : context.dispatch
  }
}

export {initialState, AuthContext, authReducer, useAuth, withAuth};
export default AuthProvider;