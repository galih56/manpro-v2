import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Discussion } from '../types';

export const deleteDiscussion = ({ discussionId }: { discussionId: string }) => {
  return axios.delete(`/discussions/${discussionId}`);
};

type UseDeleteDiscussionOptions = {
  config?: MutationConfig<typeof deleteDiscussion>;
};

export const useDeleteDiscussion = ({ config }: UseDeleteDiscussionOptions = {}) => {
  const { add } = useNotifications();

  return useMutation({
    onMutate: async (deletedDiscussion) => {
      await queryClient.cancelQueries('discussions');

      const previousDiscussions = queryClient.getQueryData<Discussion[]>('discussions');

      queryClient.setQueryData(
        'discussions',
        previousDiscussions?.filter(
          (discussion) => discussion.id !== deletedDiscussion.discussionId
        )
      );

      return { previousDiscussions };
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData('discussions', context.previousDiscussions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('discussions');
      add({
        type: 'success',
        title: 'Discussion Deleted',
      });
    },
    ...config,
    mutationFn: deleteDiscussion,
  });
};
