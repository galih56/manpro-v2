import { useParams } from 'react-router-dom';

import { Spinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
// import { Comments } from '@/features/comments';
import { formatDate } from '@/utils/datetime';

import { useProject } from '../api/getProject';
import { UpdateProject } from '../components/UpdateProject';
import { ProjectDetail } from '../components/ProjectDetail';

import { TasksProvider, useTasks } from '@/stores/tasks';

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
  

  const project = projectQuery.data;
  
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
                  <TasksProvider>
                    <ProjectDetail project={projectQuery.data}/>
                  </TasksProvider>
                </div>
              </div>
            </div>
          </div>
      </ContentLayout>
    </>
  );
};
