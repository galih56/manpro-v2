import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Project } from '../types';

export const deleteProject = ({ projectId }: { projectId: string }) => {
  return axios.delete(`/projects/${projectId}`);
};

type UseDeleteProjectOptions = {
  config?: MutationConfig<typeof deleteProject>;
};

export const useDeleteProject = ({ config }: UseDeleteProjectOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (deletedProject) => {
      await queryClient.cancelQueries(['projects']);

      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      queryClient.setQueryData(
        ['projects'],
        previousProjects?.filter(
          (project) => project.id !== deletedProject.projectId
        )
      );

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
        title: 'Project Deleted',
      });
    },
    ...config,
    mutationFn: deleteProject,
  });
};
