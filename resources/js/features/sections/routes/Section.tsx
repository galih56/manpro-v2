import { useParams } from 'react-router-dom';

import { Spinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
// import { Comments } from '@/features/comments';
import { formatDate } from '@/utils/datetime';

import { useSection } from '../api/getSection';
import { UpdateSection } from '../components/UpdateSection';

export const Section = () => {
  const { sectionId } = useParams();
  const sectionQuery = useSection({ sectionId });

  if (sectionQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!sectionQuery.data) return null;

  return (
    <>
      <Head title={sectionQuery.data.name} />
      <ContentLayout title={sectionQuery.data.name}>
        <span className="text-xs font-bold">{formatDate(sectionQuery.data.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateSection sectionId={sectionId} />
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
