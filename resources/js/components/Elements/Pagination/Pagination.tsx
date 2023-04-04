import * as React from 'react';
import clsx from 'clsx'
import { Option, SelectField } from '@/components/Form';
import { useWindowSize } from '@/hooks/useWindowResize';

type PaginationProps = {
   currentPage: number; 
   pageNumbers: number;
   itemsPerPage: number; 
   totalItems: number; 
   offset: number;
   pageOnChange : (value : number) => void;
   itemsPerPageOnChange : (value : number) => void;
}

type PageButtonProps = {
   ariaCurrent?: "time" | "false" | "true" | "page" | "step" | "location" | "date" | undefined;
   isActive?: boolean;
   children: React.ReactNode;
   className?: string;
   onClick: () =>void;
}

const PageButton = ({ children, isActive=false, className, onClick } : PageButtonProps) => {
   return (
      <div className="self-center" >
         <a className={clsx("cursor-pointer relative block rounded-full bg-transparent py-1.5 px-3 text-sm transition-all duration-30 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white", 
               isActive ? "hover:bg-neutral-400 font-medium text-primary-700 bg-slate-200": "hover:bg-neutral-200",
               className
            )}
            onClick={onClick}>
            {children}
         </a>
         { isActive ?
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">(current)</span> : null}
      </div>
   )
} 

export const Pagination = ({ currentPage, pageNumbers, offset=1, itemsPerPage, totalItems, pageOnChange, itemsPerPageOnChange }: PaginationProps) => {
   const windowSize = useWindowSize();
   const onFirstPage = currentPage == 1;
   const onLastPage = currentPage == pageNumbers;

   var numbers : number[] = [];

   for (let i = (1 - offset); i < (pageNumbers + offset); i++) {
      if(i > 0 && i <= pageNumbers) numbers.push(i);
   }

   const handlePrevPage = () => {
      if(!onFirstPage) pageOnChange(currentPage - 1)
   };
   const handleNextPage = () => {
      if(!onLastPage) pageOnChange(currentPage + 1)
   };
   return (
      <nav aria-label="Page Navigation">
         <ul className="list-style-none flex flex-grow flex-wrap align-middle">
            <li  className='lg:basis-1/2 pt-2 grow flex flex-wrap lg:justify-start md:justify-evenly'>
               <ul className='list-style-none flex align-middle'>
                  <li>
                     <PageButton  className={clsx('hover:bg-neutral-100',onFirstPage ? "text-gray-500": "")} onClick={handlePrevPage}>
                        Previous
                     </PageButton>
                  </li>
                  {numbers.map(number => (
                     <li key={'page-'+number}>
                        <PageButton isActive={currentPage==number}  onClick={() => pageOnChange(number)}> 
                           {number}
                        </PageButton>
                     </li>
                  ))}
                  <li>
                     <PageButton className={clsx('hover:bg-neutral-100',onLastPage ? "text-gray-500": "")} onClick={handleNextPage}>
                        Next
                     </PageButton>
                  </li>
               </ul>
            </li>
            <li className='lg:basis-1/2 md:basis-1/2  pt-2 flex justify-end'>
               {windowSize.width > 512 ?(
                  <>
                     <div className='my-1.5 mx-2 self-center'>
                        <p className="text-sm text-gray-700">
                           Showing
                           <span className="px-1 font-medium">1</span>
                           to
                           <span className="px-1 font-medium">10</span>
                           of
                           <span className="px-1 font-medium">97</span>
                           results
                        </p>
                     </div>
                     <div className="flex">
                        <div className='self-center whitespace-nowrap px-2'>
                           Go to :
                        </div>
                        <SelectField
                           defaultValue={
                              [
                                 {
                                    label: numbers[0],
                                    value: numbers[0]
                                 }
                              ]} 
                           options={
                              numbers.map(number => ({
                                 label: number,
                                 value: number
                              }))
                           }
                           onChange={(option : any)=> pageOnChange(option.value as number)} 
                        />
                     </div>
                     <div className="flex">
                        <div className='self-center whitespace-nowrap px-2'>
                           Show :
                        </div>
                        <SelectField 
                           defaultValue={[{ label : 10, value : 10 }]}
                           options={
                              [
                                 { label : 10, value : 10 },
                                 { label : 25, value : 25 },
                                 { label : 50, value : 50 },
                                 { label : 100, value : 100 },
                              ]
                           }
                           onChange={(option : any)=> itemsPerPageOnChange(option.value as number)} 
                        />
                     </div>
                  </>
               ) : null}
            </li>
         </ul>
      </nav>
    );

};
