import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Task } from '../types';
import { Option } from '@/components/Form';

export type UpdateTaskDTO = {
  data: {
    title: string;
    description: string;
    labels?: Option[]
    assignees?: Option[]
  };
  taskId: string;
};

export const updateTask = ({
  data,
  taskId,
}: UpdateTaskDTO): Promise<Task> => {
  if(data.labels){
    data.labels = data.labels.map((label : any) => label.value);
  }
  return axios.patch(`/tasks/${taskId}`, data);
};

type UseUpdateTaskOptions = {
  config?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({ config }: UseUpdateTaskOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingTask: any) => {
      
      if(updatingTask.labels){
        updatingTask.labels = updatingTask.labels.map((item : any) => ({
          id : item.value,
          name : item.label
        }));
        updatingTask.assignees = updatingTask.assignees.map((item : any) => ({
          id : item.value,
          name : item.label
        }));
      }
      await queryClient.cancelQueries(['tasks', updatingTask?.taskId]);

      const previousTask = queryClient.getQueryData<Task>([
        'tasks',
        updatingTask?.taskId,
      ]);
      
      queryClient.setQueryData(['tasks', updatingTask?.taskId], {
        ...previousTask,
        ...updatingTask.data,
        id: updatingTask.taskId,
      });

      return { previousTask };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTask) {
        queryClient.setQueryData(
          ['tasks', context.previousTask.id],
          context.previousTask
        );
      }
    },
    onSuccess: (data) => {
      add({
        type: 'success',
        title: 'Task Updated',
      });
    },
    ...config,
    mutationFn: updateTask,
  });
};
