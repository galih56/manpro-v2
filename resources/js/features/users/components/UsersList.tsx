import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/format';

import { useUsers } from '../api/getUsers';
import { User } from '../types';

import { DeleteUser } from './DeleteUser';

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!usersQuery.data) return null;

  return (
    <Table<User>
      data={usersQuery.data}
      columns={[
        {
          title: 'Name',
          field: 'name',
        },
        {
          title: 'Email',
          field: 'email',
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
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
};
