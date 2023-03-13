import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Project } from '../types';

export type CreateProjectDTO = {
  data: {
    title: string;
    description: string;
  };
};

export const createProject = ({ data }: CreateProjectDTO): Promise<Project> => {
  return axios.post(`/projects`, data);
};

type UseCreateProjectOptions = {
  config?: MutationConfig<typeof createProject>;
};

export const useCreateProject = ({ config }: UseCreateProjectOptions = {}) => {
  const { add } = useNotifications();
  return useMutation({
    onMutate: async (newProject) => {
      await queryClient.cancelQueries(['projects']);

      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      queryClient.setQueryData(['projects'], [...(previousProjects || []), newProject.data]);

      return { previousProjects };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      add({
        type: 'success',
        title: 'Project Created',
      });
    },
    ...config,
    mutationFn: createProject,
  });
};
