import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Section } from '../types';

export const getSections = (): Promise<Section[]> => {
  return axios.get('/sections').then(res => res.data);
};

type QueryFnType = typeof getSections;

type UseSectionsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useSections = ({ config = {} }: UseSectionsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['sections'],
    queryFn: () => getSections(),
  });
};
