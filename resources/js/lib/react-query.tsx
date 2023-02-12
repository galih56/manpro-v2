import { AxiosError } from 'axios';
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from '@tanstack/react-query';
import { PromiseValue } from 'type-fest';
import { toast } from 'react-hot-toast';

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: false,
    refetchOnWindowFocus: true,
    retry: false,
    onError : async (error)=>{
      console.log(error)
      return Promise.resolve(error);
    }
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;
