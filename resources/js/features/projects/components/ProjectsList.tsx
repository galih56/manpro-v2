import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/datetime';

import { useProjects } from '../api/getProjects';
import { Project } from '../types';

import { DeleteProject } from './DeleteProject';
import { UpdateProject } from './UpdateProject';

export const ProjectsList = () => {
  const rolesQuery = useProjects();
  
  if (rolesQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!rolesQuery.data) return null;

  return (
    <Table<Project>
      data={rolesQuery.data}
      columns={[
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: 'Actions',
          field: 'id',
          Cell({ entry: { id } }) {
            return id !== undefined || id !== null ? <UpdateProject projectId={id} /> : <></>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return id !== undefined || id !== null ? <DeleteProject id={id} /> : <></>;
          },
        },
      ]}
    />
  );
};
