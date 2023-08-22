import { Table, Spinner, Link, Pagination } from '@/components/Elements';
import { formatDate } from '@/utils/datetime';

import { SectionsRequestDTO, useSections } from '../api/getSections';
import { Section } from '../types';

import { DeleteSection } from './DeleteSection';
import { UpdateSection } from './UpdateSection';
import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';
import clsx from 'clsx';

export const SectionsList = () => {
  const {  page, limit, pageOnChange, itemsPerPageOnChange } = usePagination({});
  const [ params, setParams ] =useState<SectionsRequestDTO>();
  const handleParamsOnChange = (value : Object) => setParams((prevValue)=>({ ...prevValue, ...value} as SectionsRequestDTO));
  const { isLoading, data, refetch } = useSections({ config : { keepPreviousData : true }, params : {  ...params, page: page, limit: limit }} );
  
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return null;
  
  return (
    <div className={clsx('bg-white rounded-xl shadow-lg my-3 p-4')}>  
      <Table<Section>
        data={data.items}
        columns={[
          {
            title: 'Title',
            field: 'title',
            Cell({ entry : { id, title , project }}) {
                return( 
                  <span>
                    {title} {project ? " - " + project.title : ""}
                  </span>
                );
            }
          },
          {
            title: 'Created At',
            field: 'createdAt',
            Cell({ entry: { createdAt } }) {
              return <span>{formatDate(createdAt)}</span>;
            },
          },  
          {
            title: 'Updated At',
            field: 'updatedAt',
            Cell({ entry: { updatedAt } }) {
              return <span>{formatDate(updatedAt)}</span>;
            },
          },
          {
            title: 'Actions',
            field: 'id',
            Cell({ entry: { id } }) {
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
        <Pagination currentPage={page} itemsPerPage={limit} offset={3} pageNumbers={data.totalPages} pageOnChange={pageOnChange} itemsPerPageOnChange={itemsPerPageOnChange}/>
    </div>
  );
};
