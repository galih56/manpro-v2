import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { dTag } from '../types';

export type UpdatedTagDTO = {
  data: {
    name: string;
    description: string;
  };
  tagId: string;
};

export const updatedTag = ({
  data,
  tagId,
}: UpdatedTagDTO): Promise<dTag> => {
  return axios.patch(`/tags/${tagId}`, data);
};

type UseUpdatedTagOptions = {
  config?: MutationConfig<typeof updatedTag>;
};

export const useUpdatedTag = ({ config }: UseUpdatedTagOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (updatingdTag: any) => {
      await queryClient.cancelQueries(['tag', updatingdTag?.tagId]);

      const previousdTag = queryClient.getQueryData<dTag>([
        'tag',
        updatingdTag?.tagId,
      ]);

      queryClient.setQueryData(['tag', updatingdTag?.tagId], {
        ...previousdTag,
        ...updatingdTag.data,
        id: updatingdTag.tagId,
      });

      return { previousdTag };
    },
    onError: (_, __, context: any) => {
      if (context?.previousdTag) {
        queryClient.setQueryData(
          ['tag', context.previousdTag.id],
          context.previousdTag
        );
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['tags']);
      // queryClient.refetchQueries(['tag', data.id]);
      add({
        type: 'success',
        title: 'dTag Updated',
      });
    },
    ...config,
    mutationFn: updatedTag,
  });
};
