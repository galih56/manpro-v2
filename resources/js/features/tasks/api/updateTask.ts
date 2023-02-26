import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Task } from '../types';

export type UpdateTaskDTO = {
  data: {
    title: string;
    description: string;
    labels?: []
  };
  taskId: string;
};

export const updateTask = ({
  data,
  taskId,
}: UpdateTaskDTO): Promise<Task> => {
  return axios.patch(`/tasks/${taskId}`, data);
};

type UseUpdateTaskOptions = {
  config?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({ config }: UseUpdateTaskOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingTask: any) => {
      await queryClient.cancelQueries(['task', updatingTask?.taskId]);

      const previousTask = queryClient.getQueryData<Task>([
        'task',
        updatingTask?.taskId,
      ]);

      queryClient.setQueryData(['task', updatingTask?.taskId], {
        ...previousTask,
        ...updatingTask.data,
        id: updatingTask.taskId,
      });

      return { previousTask };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTask) {
        queryClient.setQueryData(
          ['task', context.previousTask.id],
          context.previousTask
        );
      }
    },
    onSuccess: (data) => {
      // queryClient.refetchQueries(['task', data.id]);
      add({
        type: 'success',
        title: 'Task Updated',
      });
    },
    ...config,
    mutationFn: updateTask,
  });
};
