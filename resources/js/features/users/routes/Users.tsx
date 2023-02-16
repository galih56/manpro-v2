import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';

import { UsersList } from '../components/UsersList';
import { CreateUser } from '../components/CreateUser';

export const Users = () => {
  return (
    <ContentLayout title="Users">
      
      {/* <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      > */}
      <div className="flex justify-end">
        <CreateUser/>
      </div>
      {/* </Authorization> */}
      <div className="mt-4">
          <UsersList />
      </div>
    </ContentLayout>
  );
};
