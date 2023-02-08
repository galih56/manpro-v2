import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '@/lib/authentication';

export const AppRoutes = () => {
  const  { auth } = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.authenticated ? protectedRoutes : publicRoutes;

  const element = useRoutes([
                              ...routes, 
                              ...commonRoutes
                            ]);

  return <>{element}</>;
};
