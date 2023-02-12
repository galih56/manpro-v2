import { useNavigate, useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '@/lib/authentication';
import { commonRoutes } from './common';
// import { useAuth } from '@/lib/authentication';

export const AppRoutes = () => {
  const  auth = useAuth();
  const routes = auth.isAuthenticated ? protectedRoutes : publicRoutes;

  
  const element = useRoutes([
                              ...routes,
                              ...commonRoutes
                            ]);

  return <>{element}</>;
};
