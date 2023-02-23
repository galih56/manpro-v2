import { ReactNode, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';
import { useAuth } from '@/lib/authentication';
import { UsersRoutes } from '@/features/users/routes';

const { TasksRoutes } = lazyImport(
  () => import('@/features/tasks'),
  'TasksRoutes'
);
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
const { Users } = lazyImport(() => import('@/features/users'), 'Users');
const { RolesRoutes } = lazyImport(() => import('@/features/roles'), 'RolesRoutes');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/users/*', element: <UsersRoutes /> },
      { path: '/roles/*', element: <RolesRoutes /> },
      { path: '/tasks/*', element: <TasksRoutes /> },
      { path: '/profile', element: <Profile /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
