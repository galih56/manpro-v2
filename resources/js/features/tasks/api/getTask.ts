import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Task } from '../types';

export const getTask = ({ taskId }: { taskId: string }): Promise<Task> => {
  return axios.get(`/tasks/${taskId}`).then(res => res.data);
};

type QueryFnType = typeof getTask;

type UseTaskOptions = {
  taskId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTask = ({ taskId, config }: UseTaskOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['task', taskId],
    queryFn: () => getTask({ taskId }),
  });
};
