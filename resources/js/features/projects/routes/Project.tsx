import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import { Spinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
// import { Comments } from '@/features/comments';
import { formatDate } from '@/utils/datetime';

import { useProject } from '../api/getProject';
import { UpdateProject } from '../components/UpdateProject';
import { TabRoutes } from '../components/Tabs/TabRoutes';
import { ProjectTabs } from '../components/Tabs/Tabs';

export const Project = () => {
  const { projectId } = useParams();
  
  const projectQuery = useProject({ projectId });

  if (projectQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!projectQuery.data) return null;

  return (
    <>
      <Head title={projectQuery.data.title} />
      <ContentLayout title={projectQuery.data.title}>
        <span className="text-xs font-bold">{formatDate(projectQuery.data.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateProject projectId={projectId!} />
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 text-sm text-gray-500">
              <Routes>
                <Route element={<ProjectTabs project={projectQuery.data}/>}>
                  {TabRoutes.map(({ element, path }) => (
                    <Route key={path} {...{ element, path }} />
                  ))}
                  <Route
                    path="*"
                    element={<Navigate to={TabRoutes[0].path} replace />}
                  />
                </Route>
              </Routes>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
