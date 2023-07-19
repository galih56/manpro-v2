import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Section } from '../types';

export type UpdateSectionDTO = {
  data: {
    name: string;
    code: string;
  };
  roleId: string;
};

export const updateSection = ({
  data,
  roleId,
}: UpdateSectionDTO): Promise<Section> => {
  return axios.patch(`/roles/${roleId}`, data);
};

type UseUpdateSectionOptions = {
  config?: MutationConfig<typeof updateSection>;
};

export const useUpdateSection = ({ config }: UseUpdateSectionOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingSection: any) => {
      console.log(updatingSection)
      await queryClient.cancelQueries(['roles', updatingSection?.roleId]);

      const previousSection = queryClient.getQueryData<Section>([
        'roles',
        updatingSection?.roleId,
      ]);

      queryClient.setQueryData(['roles', updatingSection?.roleId], {
        ...previousSection,
        ...updatingSection.data,
        id: updatingSection.roleId,
      });

      return { previousSection };
    },
    onError: (_, __, context: any) => {
      if (context?.previousSection) {
        queryClient.setQueryData(
          ['roles', context.previousSection.id],
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
