import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const authenticatedUser = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = Boolean(authenticatedUser.data) ? protectedRoutes : publicRoutes;

  const element = useRoutes([
                              ...routes, 
                              ...commonRoutes
                            ]);

  return <>{element}</>;
};
