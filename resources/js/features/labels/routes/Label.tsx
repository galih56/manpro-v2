import { ContentLayout } from '@/components/Layout';

import { CreateLabel } from '../components/CreateLabel';
import { LabelsList } from '../components/LabelsList';

export const Labels = () => {
  return (
    <ContentLayout title="Labels">
      <div className="flex justify-end">
        <CreateLabel />
      </div>
      <div className="mt-4">
        <LabelsList />
      </div>
    </ContentLayout>
  );
};
