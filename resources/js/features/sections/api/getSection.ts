import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Section } from '../types';

export const getSection = ({ sectionId }: { sectionId: string }): Promise<Section> => {
  return axios.get(`/sections/${sectionId}`).then(res => res.data);
};

type QueryFnType = typeof getSection;

type UseSectionOptions = {
  sectionId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useSection = ({ sectionId, config }: UseSectionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['section', sectionId],
    queryFn: () => getSection({ sectionId }),
  });
};
