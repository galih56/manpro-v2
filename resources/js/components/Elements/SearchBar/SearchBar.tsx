
import clsx from 'clsx';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Button } from '../Button';
import { InputField } from '@/components/Form';
import { ReactNode, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';


type FilterToggleIconProps = {
    open : boolean,
}

const FilterToggleIcon = ({ open } : FilterToggleIconProps) => (open ? <ChevronUpIcon className="h-6 w-6"/> : <ChevronDownIcon className="h-6 w-6"/>)

type SearchBarProps = {
    placeholder : string
    withSubmitButton? : boolean
    filterInputs? : ReactNode,
    className?: string;
    registration?: Partial<UseFormRegisterReturn>;
}

export const SearchBar = ({ filterInputs, placeholder, withSubmitButton, registration } : SearchBarProps) => {
    const [ showFilter , setShowFilter] =useState<boolean>(false);
    
    return (
        <div className={clsx('bg-white rounded-xl shadow-lg my-3 p-4')}>
            <div className="flex items-center space-x-6 justify-evenly">
                <div className={(clsx(
                        "bg-gray-100 px-2 w-72 space-x-2 rounded-lg items-center flex", 
                        filterInputs ? "basis-2/3 " : "basis-3/4"
                    ))}>
                    <MagnifyingGlassIcon className="h-4 w-4 opacity-30" />
                    <input className="w-full border-transparent focus:border-transparent focus:ring-0 bg-gray-100 outline-none" 
                        type="text" 
                        placeholder={placeholder} 
                        {...registration}/>
                </div>
                <div className={clsx(
                        "py-2 px-2 rounded-lg text-gray-500 font-semibold cursor-pointer", 
                        "flex justify-end",
                        filterInputs ? "basis-1/3" : "basis-1/4"
                    )} onClick={()=>setShowFilter(!showFilter)}>
                    {filterInputs ? 
                        <div className="mx-2 flex items-center">
                            <span className="mx-2">Filter</span>
                            <FilterToggleIcon open={showFilter} />
                        </div>
                    : <></>}
                    {withSubmitButton ? <Button type="button"> Search </Button> : <></>}
                </div>
            </div>
            {filterInputs && showFilter ? 
             <div className={clsx('transform transition-transform duration-1000', showFilter ? 'opacity-100 ease-in' : 'opacity-0 ease-out')}>
               {filterInputs}
            </div> : <></>}
        </div>
    )
}