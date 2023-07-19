import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import clsx from 'clsx'
import { Pagination } from '../Pagination';
import { NoEntriesFound } from '@/components/Layout';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  thClassName?: string;
  tdClassName?: string;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  className?: string;
};

export const Table = <Entry extends { id: string }>({ data, columns, className}: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <NoEntriesFound/>
    );
  }
  return (
    <div className={clsx("flex flex-col",className)}>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="my-3 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.title + index}
                      scope="col"
                      className={clsx("px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase",column.thClassName)}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, entryIndex) => (
                  <tr key={entry?.id || entryIndex} className="odd:bg-white even:bg-gray-100">
                    {columns.map(({ Cell, field, title, tdClassName }, columnIndex) => (
                      <td
                        key={title + columnIndex}
                        className={clsx("px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap", tdClassName)}
                      >
                        {Cell ? <Cell entry={entry} /> : entry[field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
