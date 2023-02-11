import { useNavigate, useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '@/lib/authentication';
import { commonRoutes } from './common';
import { useEffect } from 'react';
// import { useAuth } from '@/lib/authentication';

export const AppRoutes = () => {
  const  { auth, isLoading, isFetching} = useAuth();
  const routes = auth.authenticated ? protectedRoutes : publicRoutes;

  
  const element = useRoutes([
                              ...routes,
                              ...commonRoutes
                            ]);

  return <>{element}</>;
};
