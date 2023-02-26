import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Label } from '../types';

export type UpdateLabelDTO = {
  data: {
    name: string;
    description: string;
  };
  labelId: string;
};

export const updateLabel = ({
  data,
  labelId,
}: UpdateLabelDTO): Promise<Label> => {
  return axios.patch(`/labels/${labelId}`, data);
};

type UseUpdateLabelOptions = {
  config?: MutationConfig<typeof updateLabel>;
};

export const useUpdateLabel = ({ config }: UseUpdateLabelOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingLabel: any) => {
      await queryClient.cancelQueries(['label', updatingLabel?.labelId]);

      const previousLabel = queryClient.getQueryData<Label>([
        'label',
        updatingLabel?.labelId,
      ]);

      queryClient.setQueryData(['label', updatingLabel?.labelId], {
        ...previousLabel,
        ...updatingLabel.data,
        id: updatingLabel.labelId,
      });

      return { previousLabel };
    },
    onError: (_, __, context: any) => {
      if (context?.previousLabel) {
        queryClient.setQueryData(
          ['label', context.previousLabel.id],
          context.previousLabel
        );
      }
    },
    onSuccess: (data) => {
      // queryClient.refetchQueries(['label', data.id]);
      add({
        type: 'success',
        title: 'Label Updated',
      });
    },
    ...config,
    mutationFn: updateLabel,
  });
};
