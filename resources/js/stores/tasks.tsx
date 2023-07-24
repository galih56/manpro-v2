import { Task } from '@/features/tasks';
import { nanoid } from 'nanoid';
import React, {ReactNode, createContext ,useReducer,useContext, ElementType} from 'react';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const initialState : Task[] = [];

type TasksContextType = {
  state : Task[],
  dispatch : React.Dispatch<any>
}

const tasksReducer = (state = initialState, action : any) => {
  const { type, payload } = action;
  switch (type) {
    case 'store' : {
      return state;
    }
    case 'add' : {
      return [
        ...state,
        payload
      ];
    }
    case 'update' : {
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
  });;

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
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return {
    tasks : context.state,
    add : (task : Task) => context.dispatch({ type : 'add', payload : task}),
    dismiss : (id : string) => context.dispatch({ type : 'delete', payload : id})
  };
}

export { initialState, TasksProvider, TasksContext, tasksReducer, useTasks, withTasks};
export default TasksProvider;



