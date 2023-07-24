import { nanoid } from 'nanoid';
import React, {ReactNode, createContext ,useReducer,useContext, ElementType} from 'react';
import { Project } from '../types';
import { User } from '@/features/users';
import { Task } from '@/features/tasks';
import { isValid, parseISO } from 'date-fns';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

type ProjectDetailType = {
  data : Project;
  tasks : Task[];
}

const initialState : ProjectDetailType = {
  data : {
    id : '',
    title : '',
    progress : 0,
    description : '',
    sections : [],
    startedAt : '',
    startOn : '',
    dueOn : '',
    dueAt : '',
    completed : false,
    completedAt : '',
    completedBy : null,
    createdAt : '',
    updatedAt : '',
  },
  tasks : []
};

type ProjectContextType = {
  state : ProjectDetailType,
  dispatch : React.Dispatch<any>
}



const projectReducer = (state = initialState, action : any) => {
  const { type, payload } = action;
  
  switch (type) {
    case 'store-project' : {
      // const tasks = flattenSectionTasks(payload.sections);
      return {
        data : payload,
        // tasks : restructureGanttChartData(tasks)
      };
    }
    case 'add-tasks' : {
      var tasks = state.tasks;
      tasks.push(payload);
    }
    case 'update-tasks' : {
      var project = {
        ...state.data,
        tasks : state.tasks.map( item => {
          if(item.id==payload.id) return payload;
          return item;
        })
      }
      return {
        ...state,
        // gantt : restructureGanttChartData(project.tasks) 
      };
    }
    case 'update-project' : {
      return {
        ...state,
        data : payload,
      };
    }
    case 'flush' : {
      return initialState;
    }
    default:
      return state;
  }
};




const ProjectContext = createContext<ProjectContextType>({
    state: initialState,
    dispatch: () => null
  });;

const withProject = (Child : ElementType) => (props : Props) => (
  <ProjectContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </ProjectContext.Consumer>
);

const ProjectProvider=({ children } : Props )=>{
  const [state, dispatch] = useReducer(projectReducer, initialState) ;
  return(
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}


function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return {
    project : context.state,
    add : (project : Projectype) => context.dispatch({ type : 'add', payload : project}),
    dismiss : (id : string) => context.dispatch({ type : 'delete', payload : id})
  };
}

export { initialState, ProjectProvider, ProjectContext, projectReducer, useProject, withProject};
export default ProjectProvider;