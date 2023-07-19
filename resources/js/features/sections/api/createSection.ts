import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { Section } from '../types';
import { PaginationType } from '@/types';
import { DateRange } from 'react-day-picker';

export type CreateSectionDTO = {
  data: {
    title: string;
    description: string;
    projectId? : string;
  };
};

export const createSection = ({ data }: CreateSectionDTO): Promise<Section> => {
  console.log(data);
  return axios.post(`/sections`, data);
};

type UseCreateSectionOptions = {
  config?: MutationConfig<typeof createSection>;
};

export const useCreateSection = ({ config }: UseCreateSectionOptions = {}) => {
  const { add } = useNotifications();
  return useMutation({
    onMutate: async (newSection : Section) => {
      await queryClient.cancelQueries(['sections']);

      const previousSections = queryClient.getQueryData<PaginationType<Section>>(['sections']);
      console.log('previousSections',previousSections)
      if(previousSections){
        var newItems : Section[] = previousSections.items.map((item : Section) => {
          if(item.id == newSection.id){
            return newSection;
          }
          return item
        })
        queryClient.setQueryData(['sections'], {
          ...previousSections,
          items : newItems
        });
      }

      return { previousSections };
    },
    onError: (_: any, __: any, context: any) => {
      if (context?.previousSections) {
        queryClient.setQueryData(['sections'], context.previousSections);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sections']);
      add({
        type: 'success',
        title: 'Section Created',
      });
    },
    ...config,
    mutationFn: createSection,
  });
};
