import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/datetime';

import { useRoles } from '../api/getRoles';
import { Role } from '../types';

import { DeleteRole } from './DeleteRole';
import { UpdateRole } from './UpdateRole';

export const RolesList = () => {
  const rolesQuery = useRoles();
  
  if (rolesQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!rolesQuery.data) return null;

  return (
    <Table<Role>
      data={rolesQuery.data}
      columns={[
        {
          title: 'Name',
          field: 'name',
        },
        {
          title: 'Code',
          field: 'code',
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
            return id !== undefined || id !== null ? <UpdateRole roleId={id} /> : <></>;
          },
        },
        // {
        //   title: '',
        //   field: 'id',
        //   Cell({ entry: { id } }) {
        //     return <DeleteRole id={id} />;
        //   },
        // },
      ]}
    />
  );
};
