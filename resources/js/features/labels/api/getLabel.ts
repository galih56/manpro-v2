import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Label } from '../types';

export const getLabel = ({ labelId }: { labelId: string }): Promise<Label> => {
  return axios.get(`/labels/${labelId}`).then(res => res.data);
};

type QueryFnType = typeof getLabel;

type UseLabelOptions = {
  labelId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useLabel = ({ labelId, config }: UseLabelOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['label', labelId],
    queryFn: () => getLabel({ labelId }),
  });
};
