import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Label } from '../types';

export type CreateLabelDTO = {
  data: {
    name: string;
    description: string;
  };
};

export const createLabel = ({ data }: CreateLabelDTO): Promise<Label> => {
  return axios.post(`/labels`, data);
};

type UseCreateLabelOptions = {
  config?: MutationConfig<typeof createLabel>;
};

export const useCreateLabel = ({ config }: UseCreateLabelOptions = {}) => {
  const { add } = useNotifications();
  return useMutation({
    onMutate: async (newLabel) => {
      await queryClient.cancelQueries(['labels']);

      const previousLabels = queryClient.getQueryData<Label[]>(['labels']);

      queryClient.setQueryData(['labels'], [...(previousLabels || []), newLabel.data]);

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
        title: 'Label Created',
      });
    },
    ...config,
    mutationFn: createLabel,
  });
};
