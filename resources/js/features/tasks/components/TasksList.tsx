import { Table, Spinner, Link, Badge, Button, Pagination } from '@/components/Elements';
import { formatDate, formatDateTime } from '@/utils/datetime';

import { TaskFiltersDTO, useTasks } from '../api/getTasks';
import { Task } from '../types';

import { DeleteTask } from './DeleteTask';
import { UpdateTask } from './UpdateTask';
import { Form, InputField, Option, SelectField } from '@/components/Form';
import { useLabelOptions } from '@/hooks/useLabelOptions';
import { useState } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';


type FilterToggleIconProps = {
  open : boolean,
}

export const TasksList = () => {
  const {  page, limit, pageOnChange, itemsPerPageOnChange } = usePagination({});
  const [ params, setParams ] =useState<TaskFiltersDTO>();
  const handleParamsOnChange = (value : Object) => setParams((prevValue)=>({ ...prevValue, ...value} as TaskFiltersDTO));
  const { isLoading, data, refetch } = useTasks({ config : { keepPreviousData : true }, params : { page: page, limit: limit, ...params}} );
  const labelOptions = useLabelOptions();
  
  
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!data) return null;
  const FilterToggleIcon = ({ open } : FilterToggleIconProps) => (open ? <ChevronUpIcon className="h-6 w-6"/> : <ChevronDownIcon className="h-6 w-6"/>)
  
  return (
    <>
      <div className={clsx('bg-white rounded-xl shadow-lg my-3 p-4')}>
        <Disclosure>
            {({ open }) => (
              /* Use the `open` state to conditionally change the direction of an icon. */
              <>
                <div className="flex flex-wrap flex-row flex-grow items-center">
                    <div className={clsx(
                            "flex-1 bg-gray-100 rounded-lg items-center flex px-2"
                        )}>
                        <div className='px-2'>
                          <MagnifyingGlassIcon className="h-6 w-6 opacity-30" />
                        </div>
                        <input className="w-full border-transparent focus:border-transparent focus:ring-0 bg-gray-100 outline-none" 
                            type="text"  placeholder={"Search..."} 
                            onChange={(e)=> handleParamsOnChange({ search : e.target.value })} 
                            />
                    </div>
                    <div className={clsx( 
                            "flex justify-end"
                        )} >
                          <div className='flex-1 py-2 text-right'>
                            <Disclosure.Button className="rounded-lg text-gray-500 font-semibold cursor-pointer">
                              <div className="mx-2 flex items-center">
                                  <span className="mx-2">Filter</span>
                                  <FilterToggleIcon open={open} />
                              </div>
                            </Disclosure.Button>
                          </div>
                        <div className='flex-2 text-right'>
                          <Button onClick={() => refetch()}> Search </Button>
                        </div>
                    </div>
                </div>
                <Disclosure.Panel>
                  <div className="flex space-x-4">
                    <div className="basis-1/2">
                      <SelectField 
                        placeholder='Labels'
                        name='labels'
                        options={labelOptions}
                        multiple={true} 
                        onChange={(options) => handleParamsOnChange({ labels : options })} 
                        />
                    </div>
                    <div className="basis-1/2">
                      <SelectField 
                        name='assignees'
                        options={labelOptions}
                        multiple={true} 
                        onChange={(options) => handleParamsOnChange({ assignees : options })} 
                        placeholder='Assignees'
                        />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
        </Disclosure>
        <Table<Task>
          className="mt-2"
          data={data.items}
          columns={[
            {
              title: 'Title',
              field: 'title',
            },
            {
              title: 'Labels',
              field: 'id',
              Cell({ entry: { id, labels } }) {
                if(labels){
                  return( 
                    <div>
                      {labels.map(label => <Badge key={id+"-label-"+label.id} title={label.name} />)}
                    </div>
                  );
                }
                return <span> - </span>
              },
            }, 
            {
              title: 'Assignees',
              field: 'id',
              Cell({ entry: { id, assignees } }) {
                if(assignees){
                  return( 
                    <div>
                      {assignees.map(assignee => <Badge key={id+"-assignee-"+assignee.id} title={assignee.name} />)}
                    </div>
                  );
                }
                return <span> - </span>
              },
            },
            {
              title: 'Created At',
              field: 'createdAt',
              Cell({ entry : { createdAt } }) {
                return <span>{formatDate(createdAt)}</span>;
              },
            },
            {
              title: 'Action',
              field: 'id',
              thClassName: 'text-center',
              Cell({ entry: { id } }) {
                return id !== undefined || id !== null ? <div className="flex justify-evenly"><UpdateTask taskId={id} />  <DeleteTask id={id} /></div>: <></>;
              },
            },
          ]}
        />
        <Pagination currentPage={page} itemsPerPage={limit} offset={3} pageNumbers={data.totalPages} pageOnChange={pageOnChange} itemsPerPageOnChange={itemsPerPageOnChange}/>
      </div>
    </>
  );
};

