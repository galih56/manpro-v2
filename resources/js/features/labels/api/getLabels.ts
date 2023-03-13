import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Label } from '../types';

export const getLabels = (): Promise<Label[]> => {
  return axios.get('/labels').then(res => res.data);
};

type QueryFnType = typeof getLabels;

type UseLabelsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useLabels = ({ config }: UseLabelsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  });
};
