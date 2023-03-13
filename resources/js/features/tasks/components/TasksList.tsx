import { Table, Spinner, Link, Badge, SearchBar } from '@/components/Elements';
import { formatDate } from '@/utils/datetime';
import * as z from 'zod';

import { SearchTasksDTO, useTasks } from '../api/getTasks';
import { Task } from '../types';

import { DeleteTask } from './DeleteTask';
import { UpdateTask } from './UpdateTask';
import { Form, InputField, SelectField } from '@/components/Form';
import { useLabelOptions } from '@/hooks/useLabelOptions';
import { useState } from 'react';

export const TasksList = () => {
  const tasksQuery = useTasks({ config : { keepPreviousData : true }, paginate : true, itemsPerPage : 10 });
  const labelOptions = useLabelOptions();
  
  if (tasksQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tasksQuery.data) return null;

  return (
    <>
      <Form<SearchTasksDTO>
            id="search-tasks"
            onSubmit={async (values) => {
              return tasksQuery.paramsOnChange(values);
            }}
            options={{
              mode : 'onChange'
            }}
          >
          {({ register, formState, control }) => (
            <SearchBar 
              placeholder='Search tasks...' 
              registration={register('title')}
              filterInputs=
              {
                <div className="flex space-x-4">
                  <div className="basis-1/2">
                    <SelectField 
                      label='Labels'
                      options={labelOptions}
                      registration={register('labels')}
                      control={control}
                      multiple={true} 
                      />
                  </div>
                  <div className="basis-1/2">
                    <SelectField 
                      label='Assignees'
                      options={labelOptions}
                      registration={register('assignees')}
                      control={control}
                      multiple={true} />
                  </div>
                </div>
              }
            />
          )}
      </Form>
      <Table<Task>
        data={tasksQuery.data.items}
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
            title: 'Created At',
            field: 'createdAt',
            Cell({ entry: { createdAt } }) {
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
    </>
  );
};
