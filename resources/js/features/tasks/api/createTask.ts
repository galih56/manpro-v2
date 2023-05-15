import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Task } from '../types';
import { PaginationType } from '@/types';
import { DateRange } from 'react-day-picker';

export type CreateTaskDTO = {
  data: {
    title: string;
    description: string;
    projectId? : string;
    tags? : string[];
    assignees? : string[];
    startOn? : Date;
    startedAt? : Date;
    dueOn? : Date; 
    completedAt? : Date;
  };
};

export const createTask = ({ data }: CreateTaskDTO): Promise<Task> => {
  console.log(data);
  return axios.post(`/tasks`, data);
};

type UseCreateTaskOptions = {
  config?: MutationConfig<typeof createTask>;
};

export const useCreateTask = ({ config }: UseCreateTaskOptions = {}) => {
  const { add } = useNotifications();
  return useMutation({
    onMutate: async (newTask : Task) => {
      await queryClient.cancelQueries(['tasks']);

      const previousTasks = queryClient.getQueryData<PaginationType<Task>>(['tasks']);
      console.log('previousTasks',previousTasks)
      if(previousTasks){
        var newItems : Task[] = previousTasks.items.map((item : Task) => {
          if(item.id == newTask.id){
            return newTask;
          }
          return item
        })
        queryClient.setQueryData(['tasks'], {
          ...previousTasks,
          items : newItems
        });
      }

      return { previousTasks };
    },
    onError: (_: any, __: any, context: any) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      add({
        type: 'success',
        title: 'Task Created',
      });
    },
    ...config,
    mutationFn: createTask,
  });
};
