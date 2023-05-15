import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Tag } from '../types';

export const getTag = ({ tagId }: { tagId: string }): Promise<Tag> => {
  return axios.get(`/tags/${tagId}`).then(res => res.data);
};

type QueryFnType = typeof getTag;

type UseTagOptions = {
  tagId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTag = ({ tagId, config }: UseTagOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tag', tagId],
    queryFn: () => getTag({ tagId }),
  });
};
