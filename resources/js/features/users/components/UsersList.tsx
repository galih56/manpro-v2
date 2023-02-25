import { Table, Spinner, Badge } from '@/components/Elements';
import { formatDate } from '@/utils/format';

import { useUsers } from '../api/getUsers';
import { User } from '../types';

import { DeleteUser } from './DeleteUser';
import { UpdateUser } from './UpdateUser';

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
          title: 'Roles',
          field: 'id',
          Cell({ entry: { id, roles } }) {
            console.log(roles)
            if(roles){
              return( 
                <div>
                  {roles.map(role => <Badge title={role.name} />)}
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
            return <UpdateUser userId={id} />;
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
