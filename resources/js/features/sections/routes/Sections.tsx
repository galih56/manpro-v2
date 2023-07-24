import { ContentLayout } from '@/components/Layout';

import { CreateSection } from '../components/CreateSection';
import { SectionsList } from '../components/SectionsList';

export const Sections = () => {
  return (
    <ContentLayout title="Sections">
      <div className="flex justify-end">
        <CreateSection />
      </div>
      <div className="mt-4">
        <SectionsList />
      </div>
    </ContentLayout>
  );
};
