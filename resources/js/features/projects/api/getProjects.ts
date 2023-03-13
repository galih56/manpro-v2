import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Project } from '../types';

export const getProjects = (): Promise<Project[]> => {
  return axios.get('/projects').then(res => res.data);
};

type QueryFnType = typeof getProjects;

type UseProjectsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useProjects = ({ config = {} }: UseProjectsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
};
