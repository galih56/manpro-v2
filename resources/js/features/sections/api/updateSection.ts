import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Section } from '../types';

export type UpdateSectionDTO = {
  data: {
    title: string;
    description: string;
    projectId: string;
  };
  sectionId: string;
};

export const updateSection = ({
  data,
  sectionId,
}: UpdateSectionDTO): Promise<Section> => {
  return axios.patch(`/sections/${sectionId}`, data);
};

type UseUpdateSectionOptions = {
  config?: MutationConfig<typeof updateSection>;
};

export const useUpdateSection = ({ config }: UseUpdateSectionOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingSection: any) => {

      await queryClient.cancelQueries(['sections', updatingSection?.sectionId]);

      const previousSection = queryClient.getQueryData<Section>([
        'sections',
        updatingSection?.sectionId,
      ]);

      queryClient.setQueryData(['sections', updatingSection?.sectionId], {
        ...previousSection,
        ...updatingSection.data,
        id: updatingSection.sectionId,
      });

      return { previousSection };
    },
    onError: (_, __, context: any) => {
      if (context?.previousSection) {
        queryClient.setQueryData(
          ['sections', context.previousSection.id],
          context.previousSection
        );
      }
    },
    onSuccess: (data) => {
      add({
        type: 'success',
        title: 'Section Updated',
      });
    },
    ...config,
    mutationFn: updateSection,
  });
};
