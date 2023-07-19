import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/datetime';

import { useSections } from '../api/getSections';
import { Section } from '../types';

import { DeleteSection } from './DeleteSection';
import { UpdateSection } from './UpdateSection';

export const SectionsList = () => {
  const sectionsQuery = useSections();
  
  if (sectionsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!sectionsQuery.data) return null;

  return (
    <Table<Section>
      data={sectionsQuery.data}
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
            console.log(id)
            return id !== undefined || id !== null ? <UpdateSection sectionId={id} /> : <></>;
          },
        },
        // {
        //   title: '',
        //   field: 'id',
        //   Cell({ entry: { id } }) {
        //     return <DeleteSection id={id} />;
        //   },
        // },
      ]}
    />
  );
};
