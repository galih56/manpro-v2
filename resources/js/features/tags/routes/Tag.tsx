import { ContentLayout } from '@/components/Layout';

import { CreateTag } from '../components/CreateTag';
import { TagsList } from '../components/TagsList';

export const Tags = () => {
  return (
    <ContentLayout title="Tags">
      <div className="flex justify-end">
        <CreateTag />
      </div>
      <div className="mt-4">
        <TagsList />
      </div>
    </ContentLayout>
  );
};
