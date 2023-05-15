import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Tag } from '../types';

export const getTags = (): Promise<Tag[]> => {
  return axios.get('/tags').then(res => res.data);
};

type QueryFnType = typeof getTags;

type UseTagsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTags = ({ config }: UseTagsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });
};
