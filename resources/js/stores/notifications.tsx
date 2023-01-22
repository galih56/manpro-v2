import { NotificationType } from '@/types';
import { nanoid } from 'nanoid';
import React, {ReactNode, createContext ,useReducer,useContext, ElementType} from 'react';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const initialState : NotificationType[] = [];

type NotificationsContextType = {
  state : NotificationType[],
  dispatch : React.Dispatch<any>
}

const notificationsReducer = (state = initialState, action : any) => {
  const { type, payload } = action;
  switch (type) {
    case 'store' : {
      return state;
    }
    case 'add' : {
      return [
        ...state,
        {
          id : nanoid(),
          title : payload.title,
          message : payload.message,
        }
      ];
    }
    case 'update' : {
      return state.map( item => {
        if(item.id==payload.id) return payload;
        return item;
      });
    }
    case 'delete' : {
      return state.filter( item => item.id != payload.id)
    }
    case 'flush' : {
      return initialState;
    }
    default:
      return state;
  }
};

const NotificationsContext = createContext<NotificationsContextType>({
    state: initialState,
    dispatch: () => null
  });;

const withNotifications = (Child : ElementType) => (props : Props) => (
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


function useNotifications<NotificationsContextType>() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return {
    notifications : context.state,
    add : (notification : NotificationType) => context.dispatch({ type : 'add', payload : notification}),
    dismiss : (notification : NotificationType) => context.dispatch({ type : 'delete', payload : notification})
  };
}

export {
    initialState, NotificationsContext, notificationsReducer, useNotifications, withNotifications};
export default NotificationsProvider;