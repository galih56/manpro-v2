import { ContentLayout } from '@/components/Layout';

import { CreateRole } from '../components/CreateRole';
import { RolesList } from '../components/RolesList';

export const Roles = () => {
  return (
    <ContentLayout title="Roles">
      <div className="flex justify-end">
        <CreateRole />
      </div>
      <div className="mt-4">
        <RolesList />
      </div>
    </ContentLayout>
  );
};
