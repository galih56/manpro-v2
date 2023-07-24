import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Tag } from '../types';

export type CreateTagDTO = {
  data: {
    name: string;
    description: string;
  };
};

export const createTag = ({ data }: CreateTagDTO): Promise<Tag> => {
  return axios.post(`/tags`, data);
};

type UseCreateTagOptions = {
  config?: MutationConfig<typeof createTag>;
};

export const useCreateTag = ({ config }: UseCreateTagOptions = {}) => {
  const { add } = useNotifications();
  return useMutation({
    onMutate: async (newTag) => {
      await queryClient.cancelQueries(['tags']);

      const previousTags = queryClient.getQueryData<Tag[]>(['tags']);

      queryClient.setQueryData(['tags'], [...(previousTags || []), newTag.data]);

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
        title: 'Tag Created',
      });
    },
    ...config,
    mutationFn: createTag,
  });
};
