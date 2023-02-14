import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/format';

import { useTasks } from '../api/getTasks';
import { Task } from '../types';

import { DeleteTask } from './DeleteTask';

export const TasksList = () => {
  const tasksQuery = useTasks();
  
  if (tasksQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tasksQuery.data) return null;

  return (
    <Table<Task>
      data={tasksQuery.data}
      columns={[
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <Link to={`./${id}`}>View</Link>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteTask id={id} />;
          },
        },
      ]}
    />
  );
};
