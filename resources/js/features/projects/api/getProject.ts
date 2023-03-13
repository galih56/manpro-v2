import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Project } from '../types';

export const getProject = ({ projectId }: { projectId: string }): Promise<Project> => {
  return axios.get(`/projects/${projectId}`).then(res => res.data);
};

type QueryFnType = typeof getProject;

type UseProjectOptions = {
  projectId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProject = ({ projectId, config }: UseProjectOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['project', projectId],
    queryFn: () => getProject({ projectId }),
  });
};
