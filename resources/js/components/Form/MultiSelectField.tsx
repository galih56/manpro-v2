import { XMarkIcon, ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/solid'
import { useState } from 'react';
import { FieldWrapperPassThroughProps } from './FieldWrapper';
import { Controller, UseFormRegisterReturn } from 'react-hook-form';
import Select, { OptionProps, MultiValueGenericProps } from 'react-select';

type Option = {
    label: React.ReactNode;
    value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
    options: Option[];
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    control?: any;
    registration: Partial<UseFormRegisterReturn>;
    multiple: boolean;
};
  
export const MultiSelectField = (props : SelectFieldProps)=>{
    const { registration, control, multiple, options } = props;
    const [selectedItems, setSelectedItems] = useState();
    const [ open, setOpen ] = useState(false);

    const TWOption = ({ innerProps } : MultiValueGenericProps) => (
        <div {...innerProps} className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md shadow-sm text-teal-700 bg-teal-100 border border-teal-300 focus:outline-none sm:text-sm'>
            <div className='text-xs font-normal leading-none max-w-full flex-initial'>
                Option 1
            </div>
            <div className='flex flex-auto flex-row-reverse'>
                <XMarkIcon className='fill-current h-4 w-4 ' />
            </div>
        </div>
    ) 

    return (
        <>
        <Controller
            control={control}
            {...registration}
            render={(field)=>(
                <Select components={{
                        MultiValue : TWOption,
                    }}
                    {...field}
                    options={options}
                    isMulti={multiple}
                />
            )}
        />
            
            <div className='my-2 flex border border-gray-200 bg-white rounded relative'>
                <div className='flex flex-auto flex-wrap'>
                    <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md shadow-sm text-teal-700 bg-teal-100 border border-teal-300 focus:outline-none sm:text-sm'>
                        <div className='text-xs font-normal leading-none max-w-full flex-initial'>
                            Option 1
                        </div>
                        <div className='flex flex-auto flex-row-reverse'>
                            <XMarkIcon className='fill-current h-4 w-4 ' />
                        </div>
                    </div>
                    <div className="flex-1 px-2">
                        <input type="text" className={'text-gray-900 outline-none border-none focus:outline-none focus:border-none sm:text-sm rounded-md appearance-none outline-none bg-transparent w-full'} />
                    </div>
                </div>
                <div className='text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200'>
                    <button type='button' className='cursor-pointer w-4 h-4 text-gray-600 outline-none focus:outline-none' onClick={()=>setOpen(!open)}>
                        {open ? <ChevronUpIcon className='fill-current h-4 w-4'/> :  <ChevronDownIcon className='fill-current h-4 w-4'/> }
                    </button>
                </div>
                {open ? 
                    <div className='absolute top-100 transform translate-y-16 -translate-x-2 shadow bg-white z-40 w-full rounded max-h-select overflow-y-auto'>
                        <div className="flex flex-col w-full">
                            <div className='cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100'>
                                <div className='flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative border-teal-600'>
                                    <div className='w-full items-center flex'>
                                        <div className="mx-2 leading-6">
                                            Option 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100'>
                                <div className='flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative'>
                                    <div className='w-full items-center flex'>
                                        <div className="mx-2 leading-6">
                                            Option 2
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                : null }
            </div>
        </>
    )
}