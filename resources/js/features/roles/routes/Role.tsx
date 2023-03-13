import { useParams } from 'react-router-dom';

import { Spinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
// import { Comments } from '@/features/comments';
import { formatDate } from '@/utils/datetime';

import { useRole } from '../api/getRole';
import { UpdateRole } from '../components/UpdateRole';

export const Role = () => {
  const { roleId } = useParams();
  const roleQuery = useRole({ roleId });

  if (roleQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!roleQuery.data) return null;

  return (
    <>
      <Head title={roleQuery.data.name} />
      <ContentLayout title={roleQuery.data.name}>
        <span className="text-xs font-bold">{formatDate(roleQuery.data.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateRole roleId={roleId} />
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
