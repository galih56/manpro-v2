import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { useAuth } from '@/stores/authentication';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuthQuery } from '@/lib/auth';

export const AppRoutes = () => {
  const  { auth } = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.loggedIn ? protectedRoutes : publicRoutes;

  const element = useRoutes([
                              ...routes, 
                              ...commonRoutes
                            ]);

  return <>{element}</>;
};
