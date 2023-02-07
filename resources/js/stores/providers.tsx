import * as React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Button, Spinner } from '@/components/elements';
import { Notifications } from '@/components/notifications/Notifications';
import { queryClient } from '@/lib/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AxiosInterceptor } from '@/lib/axios';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './authentication';

const ErrorFallback = () => {
  return (
    <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert" >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AxiosInterceptor>
              <AuthProvider>
                <Notifications />
                <Router>{children}</Router>
                <Toaster position='bottom-left'/>
              </AuthProvider>
            </AxiosInterceptor>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};