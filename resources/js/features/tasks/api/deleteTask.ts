import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Task } from '../types';

export const deleteTask = ({ taskId }: { taskId: string }) => {
  return axios.delete(`/tasks/${taskId}`);
};

type UseDeleteTaskOptions = {
  config?: MutationConfig<typeof deleteTask>;
};

export const useDeleteTask = ({ config }: UseDeleteTaskOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (deletedTask) => {
      await queryClient.cancelQueries('tasks');

      const previousTasks = queryClient.getQueryData<Task[]>('tasks');

      queryClient.setQueryData(
        'tasks',
        previousTasks?.filter(
          (task) => task.id !== deletedTask.taskId
        )
      );

      return { previousTasks };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTasks) {
        queryClient.setQueryData('tasks', context.previousTasks);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      add({
        type: 'success',
        title: 'Task Deleted',
      });
    },
    ...config,
    mutationFn: deleteTask,
  });
};
