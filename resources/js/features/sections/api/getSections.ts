import { QueryKey, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Section } from '../types';
import { PaginationDTO, PaginationType } from '@/types';
import { camelizeKeys } from 'humps';
import { useEffect } from 'react';


export type SectionsRequestDTO = {
  search?: string;
} & PaginationDTO;

export const getSections = (params? : SectionsRequestDTO):  (Promise<PaginationType<Section> | Section[]>) => {
  if(params){ 
    return axios.get('/sections',{ params : params }).then(res => {
      var data = res.data;
      if(params.page){
        data.items = data.items.map((item : any) => camelizeKeys(item) as Section);
        return data as PaginationType<Section>
      } else {
        data = data.map((item : any) => camelizeKeys(item) as Section);
        return data as Section[]
      }
    });
  }
  return axios.get('/sections').then(res => res.data.map((item : any) => camelizeKeys(item) as Section));
};


type QueryFnType = typeof getSections;

type UseSectionsOptions = {
  params? : SectionsRequestDTO
  config?: QueryConfig<QueryFnType>;
};

export const useSections = ({ config = {}, params }: UseSectionsOptions = {}) => {
  const queryKey : QueryKey = params ? ['sections', params] : ['sections'];

  const query = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey,
    queryFn: ()=> getSections(params),
  });

  
  useEffect(() => {
    if (!query.isPreviousData && query.data?.hasMore) {
      query.refetch();
    }
  }, [query.isPreviousData, params]);
  
  return query;
};
