import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Label } from '../types';

export const deleteLabel = ({ labelId }: { labelId: string }) => {
  return axios.delete(`/labels/${labelId}`);
};

type UseDeleteLabelOptions = {
  config?: MutationConfig<typeof deleteLabel>;
};

export const useDeleteLabel = ({ config }: UseDeleteLabelOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (deletedLabel) => {
      await queryClient.cancelQueries(['labels']);

      const previousLabels = queryClient.getQueryData<Label[]>(['labels']);

      queryClient.setQueryData(
        ['labels'],
        previousLabels?.filter(
          (label) => label.id !== deletedLabel.labelId
        )
      );

      return { previousLabels };
    },
    onError: (_, __, context: any) => {
      if (context?.previousLabels) {
        queryClient.setQueryData(['labels'], context.previousLabels);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
      add({
        type: 'success',
        title: 'Label Deleted',
      });
    },
    ...config,
    mutationFn: deleteLabel,
  });
};
