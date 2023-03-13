import { useParams } from 'react-router-dom';

import { Spinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
// import { Comments } from '@/features/comments';
import { formatDate } from '@/utils/datetime';

import { useTask } from '../api/getTask';
import { UpdateTask } from '../components/UpdateTask';

export const Task = () => {
  const { taskId } = useParams();
  const taskQuery = useTask({ taskId });

  if (taskQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!taskQuery.data) return null;

  return (
    <>
      <Head title={taskQuery.data.title} />
      <ContentLayout title={taskQuery.data.title}>
        <span className="text-xs font-bold">{formatDate(taskQuery.data.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateTask taskId={taskId} />
          </div>
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  <MDPreview value={taskQuery.data.description} />
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <Comments taskId={taskId} />
          </div> */}
        </div>
      </ContentLayout>
    </>
  );
};
