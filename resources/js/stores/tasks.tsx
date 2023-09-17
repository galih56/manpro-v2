import { Task } from '@/features/tasks';
import { nanoid } from 'nanoid';
import React, {ReactNode, createContext ,useReducer,useContext, ElementType} from 'react';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const initialState : any[] = [];

type TasksContextType = {
  state : any[],
  dispatch : React.Dispatch<any>
}

const tasksReducer = (state = initialState, action : any) => {
  const { type, payload } = action;
  switch (type) {
    case 'store' : {
      return payload;
    }
    case 'add' : {
      return [
        ...state,
        payload
      ];
    }
    case 'update' : {
      console.log('update',payload)
      return state.map( item => {
        if(item.id==payload.id) return payload;
        return item;
      });
    }
    case 'delete' : {
      return state.filter( item => item.id != payload)
    }
    case 'flush' : {
      return initialState;
    }
    default:
      return state;
  }
};

const TasksContext = createContext<TasksContextType>({
    state: initialState,
    dispatch: () => null
});

const withTasks = (Child : ElementType) => (props : Props) => (
  <TasksContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </TasksContext.Consumer>
);

const TasksProvider=({ children } : Props )=>{
  const [state, dispatch] = useReducer(tasksReducer, initialState) ;
  return(
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}


function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    console.warn('useTasks must be used within a TasksProvider')
    return null;
  }
  return {
    tasks : context.state,
    add : (task : any) => context.dispatch({ type : 'add', payload : task}),
    store : (tasks : Array<any>) => context.dispatch({ type : 'store', payload : tasks}),
    update : (task : any) => context.dispatch({ type : 'update', payload : task}),
    remove : (id : string) => context.dispatch({ type : 'delete', payload : id})
  };
}

export { initialState, TasksProvider, TasksContext, tasksReducer, useTasks, withTasks};
export default TasksProvider;



