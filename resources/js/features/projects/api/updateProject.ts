import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Project } from '../types';

export type UpdateProjectDTO = {
  data: {
    title: string,
    description: string,
  };
  projectId: string;
};

export const updateProject = ({
  data,
  projectId,
}: UpdateProjectDTO): Promise<Project> => {
  return axios.patch(`/projects/${projectId}`, data);
};

type UseUpdateProjectOptions = {
  config?: MutationConfig<typeof updateProject>;
};

export const useUpdateProject = ({ config }: UseUpdateProjectOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingProject: any) => {
      await queryClient.cancelQueries(['projects', updatingProject?.projectId]);

      const previousProject = queryClient.getQueryData<Project>([
        'projects',
        updatingProject?.projectId,
      ]);

      queryClient.setQueryData(['projects', updatingProject?.projectId], {
        ...previousProject,
        ...updatingProject.data,
        id: updatingProject.projectId,
      });

      return { previousProject };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProject) {
        queryClient.setQueryData(
          ['projects', context.previousProject.id],
          context.previousProject
        );
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['projects']);
      add({
        type: 'success',
        title: 'Project Updated',
      });
    },
    ...config,
    mutationFn: updateProject,
  });
};
