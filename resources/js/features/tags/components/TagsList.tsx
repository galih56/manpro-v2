import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/datetime';

import { useTags } from '../api/getTags';
import { Tag } from '../types';

import { DeleteTag } from './DeleteTag';
import { UpdateTag } from './UpdateTag';

export const TagsList = () => {
  const tagsQuery = useTags();
  
  if (tagsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tagsQuery.data) return null;

  return (
    <Table<Tag>
      data={tagsQuery.data}
      columns={[
        {
          title: 'Name',
          field: 'name',
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
            return id !== undefined || id !== null ? <UpdateTag tagId={id} /> : <></>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return id !== undefined || id !== null ? <DeleteTag id={id} /> : <></>;
          },
        },
      ]}
    />
  );
};
