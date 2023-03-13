import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/datetime';

import { useLabels } from '../api/getLabels';
import { Label } from '../types';

import { DeleteLabel } from './DeleteLabel';
import { UpdateLabel } from './UpdateLabel';

export const LabelsList = () => {
  const labelsQuery = useLabels();
  
  if (labelsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!labelsQuery.data) return null;

  return (
    <Table<Label>
      data={labelsQuery.data}
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
            return id !== undefined || id !== null ? <UpdateLabel labelId={id} /> : <></>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return id !== undefined || id !== null ? <DeleteLabel id={id} /> : <></>;
          },
        },
      ]}
    />
  );
};
