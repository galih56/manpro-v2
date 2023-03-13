import { QueryKey, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryClient } from '@/lib/react-query';

import { Task } from '../types';
import { Option } from '@/components/Form';
import { useEffect, useState } from 'react';
import { camelize, camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import { PaginationType } from '@/types';

export type SearchTasksDTO = {
  title?: string;
  description?: string;
  labels?: Option[] | number[]
  assignees?: Option[] | number[]
} & PaginationProps;

export const getTasks = (data : SearchTasksDTO): (Promise<Task[]> |  Promise<PaginationType>) => {
  let params = data;
  if(data){ 
    params.labels = data.labels?.map((item : any) : number=> item.value);
    params.assignees = data.assignees?.map((item : any) : number=> item.value);
  }
  
  return axios.get('/tasks',{ params : params }).then(res => res.data);
};

type QueryFnType = typeof getTasks;

type UseTasksOptions = {
  params? : Object;
  config?: QueryConfig<QueryFnType>;
} & PaginationProps;

type PaginationProps = {
  paginate? : boolean;
  itemsPerPage? : number;
}

export const useTasks = ({ config = {}, paginate = false, itemsPerPage = 1 }: UseTasksOptions = {}) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState<number>(itemsPerPage)
  const [params, setParams] = useState<any>(null);
  const request = { page : page, limit : limit, ...params };

  const pageOnChange = (number : number) => setPage(number);
  const paramsOnChange = (data : any) => setParams(data);
  const itemsPerPageOnChange = (data : any) => setLimit(data);

  const queryKey : QueryKey = paginate ? ['tasks', page] : ['tasks'];
  const query = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey,
    queryFn: ()=> getTasks(request),
  });

  const prefetch = () => {
    queryClient.prefetchQuery(['tasks', page], () => getTasks(request))
  }
  
  useEffect(() => {
    if (!query.isPreviousData && query.data?.hasMore) {
      prefetch();
    }
  }, [query.data, query.isPreviousData, page, queryClient, params]);
  
  console.log(camelizeKeys(query.data))
  return {
    ...query,
    page,
    pageOnChange,
    paramsOnChange,
    itemsPerPageOnChange,
    queryClient,
    prefetch
  };
};
