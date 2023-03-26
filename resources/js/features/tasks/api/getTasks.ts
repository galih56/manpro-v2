import { QueryKey, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Task } from '../types';
import { Option } from '@/components/Form';
import { useEffect, useState } from 'react';
import { PaginationDTO, PaginationType } from '@/types';
import { camelizeKeys } from 'humps';

export type TaskFiltersDTO = {
  search?: string;
  labels?: string[]
  assignees?: string[]
} & PaginationDTO;

export const getTasks = (params? : TaskFiltersDTO):  (Promise<Task[] | PaginationType<Task>>) => {
  if(params){ 
    return axios.get('/tasks',{ params : params }).then(res => {
      var data = res.data;
      if(params.page){
        data.items = data.items.map((item : any) => camelizeKeys(item) as Task);
        return data as PaginationType<Task>
      } else {
        data = data.map((item : any) => camelizeKeys(item) as Task);
        return data as Task[]
      }
    });
  }
  return axios.get('/tasks').then(res => res.data);
};

type QueryFnType = typeof getTasks;

type UseTasksOptions = {
  params? : TaskFiltersDTO;
  config?: QueryConfig<QueryFnType>;
};

export const useTasks = ({ config = {}, params }: UseTasksOptions) => {
  const queryKey : QueryKey = params ? ['tasks', params] : ['tasks'];

  const query = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey,
    queryFn: ()=> getTasks(params),
  });

  
  useEffect(() => {
    if (!query.isPreviousData) {
      query.refetch();
    }
    console.log(query.isPreviousData, config, params)
  }, [query.isPreviousData, params]);
  
  return query;
};
