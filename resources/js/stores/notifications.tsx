import React, {ReactNode, createContext ,useReducer,useContext} from 'react';

type NotificationsType = {
    id? : string,
    title? : string,
    message? : string
}
const initialState : NotificationsType[] = [];

interface Props {
    children?: ReactNode
    // any props that come into the component
}


const notificationsReducer = (state = initialState, action : any) => {
  const { type, payload } = action;
  switch (type) {
    case 'store': {
      localStorage.setItem('notifications', JSON.stringify(payload));
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
      localStorage.setItem('notifications', JSON.stringify(newState));
      return newState;
    }
    case 'flush': {
      localStorage.removeItem('notifications');
      return initialState;
    }
    default:
      return state;
  }
};


const NotificationsContext = createContext<{
    state: NotificationsType[];
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });;

const withNotifications = (Child : ReactNode) => (props : Props) => (
  <NotificationsContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </NotificationsContext.Consumer>
);

const NotificationsProvider=({ children } : Props )=>{
  const [state, dispatch] = useReducer(notificationsReducer, initialState) ;
  return(
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  )
}

function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return {
    notifications : context.state,
    notificationsDispatch : context.dispatch
  }
}

export {
    initialState, NotificationsContext, notificationsReducer, useNotifications, withNotifications};
export default NotificationsProvider;