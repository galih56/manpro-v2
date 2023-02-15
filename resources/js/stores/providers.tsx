import * as React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Spinner } from '@/components/elements';
import { Notifications } from '@/components/notifications/Notifications';
import { queryClient } from '@/lib/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AxiosInterceptor } from '@/lib/axios';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NODE_ENV } from '@/config';
import { AppProviderProps } from '@/types';
import { ErrorBoundaryWrapper } from '@/lib/error-boundary';



  
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundaryWrapper>
        <HelmetProvider>
          <Router>
            <AxiosInterceptor>
              <QueryClientProvider client={queryClient}>
                <Notifications />
                  {children}
                <Toaster position='top-center'/>
                {NODE_ENV == 'dev' && <ReactQueryDevtools />}
              </QueryClientProvider>
            </AxiosInterceptor>
          </Router>
        </HelmetProvider>
      </ErrorBoundaryWrapper>
    </React.Suspense>
  );
};