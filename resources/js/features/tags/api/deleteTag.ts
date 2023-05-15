import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Tag } from '../types';

export const deleteTag = ({ tagId }: { tagId: string }) => {
  return axios.delete(`/tags/${tagId}`);
};

type UseDeleteTagOptions = {
  config?: MutationConfig<typeof deleteTag>;
};

export const useDeleteTag = ({ config }: UseDeleteTagOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (deletedTag) => {
      await queryClient.cancelQueries(['tags']);

      const previousTags = queryClient.getQueryData<Tag[]>(['tags']);

      queryClient.setQueryData(
        ['tags'],
        previousTags?.filter(
          (tag) => tag.id !== deletedTag.tagId
        )
      );

      return { previousTags };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTags) {
        queryClient.setQueryData(['tags'], context.previousTags);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      add({
        type: 'success',
        title: 'Tag Deleted',
      });
    },
    ...config,
    mutationFn: deleteTag,
  });
};
