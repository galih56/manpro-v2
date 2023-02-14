import { ContentLayout } from '@/components/Layout';

import { CreateTask } from '../components/CreateTask';
import { TasksList } from '../components/TasksList';

export const Tasks = () => {
  return (
    <ContentLayout title="Tasks">
      <div className="flex justify-end">
        <CreateTask />
      </div>
      <div className="mt-4">
        <TasksList />
      </div>
    </ContentLayout>
  );
};
