import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Section } from '../types';

export const deleteSection = ({ roleId }: { roleId: string }) => {
  return axios.delete(`/roles/${roleId}`);
};

type UseDeleteSectionOptions = {
  config?: MutationConfig<typeof deleteSection>;
};

export const useDeleteSection = ({ config }: UseDeleteSectionOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (deletedSection) => {
      await queryClient.cancelQueries(['roles']);

      const previousSections = queryClient.getQueryData<Section[]>(['roles']);

      queryClient.setQueryData(
        ['roles'],
        previousSections?.filter(
          (role) => role.id !== deletedSection.roleId
        )
      );

      return { previousSections };
    },
    onError: (_, __, context: any) => {
      if (context?.previousSections) {
        queryClient.setQueryData(['roles'], context.previousSections);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
      add({
        type: 'success',
        title: 'Section Deleted',
      });
    },
    ...config,
    mutationFn: deleteSection,
  });
};
