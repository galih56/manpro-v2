import { Table, Spinner, Link, Badge } from '@/components/Elements';
import { formatDate } from '@/utils/format';

import { useTasks } from '../api/getTasks';
import { Task } from '../types';

import { DeleteTask } from './DeleteTask';
import { UpdateTask } from './UpdateTask';

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
          title: 'Labels',
          field: 'id',
          Cell({ entry: { id, name, labels } }) {
            if(labels){
              return( 
                <div>
                  {labels.map(label => <Badge key={id+"-label-"+label.id} title={label.name} />)}
                </div>
              );
            }
            return <span> - </span>
          },
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
            return id ? <UpdateTask taskId={id} /> : <></>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return id ? <DeleteTask id={id} /> : <></>;
          },
        },
      ]}
    />
  );
};
