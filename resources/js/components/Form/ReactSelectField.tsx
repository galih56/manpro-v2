import { XMarkIcon, ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/solid'
import { SyntheticEvent, useState } from 'react';
import { FieldWrapperPassThroughProps } from './FieldWrapper';
import { Controller, UseFormRegisterReturn, useForm } from 'react-hook-form';
import Select, { OptionProps, MultiValueGenericProps, MultiValueRemoveProps, StylesConfig } from 'react-select';
import clsx from 'clsx';
import { FieldWrapper } from './FieldWrapper';

type Option = {
    label: React.ReactNode;
    value: string | number | string[];
};

export type SelectFieldProps = FieldWrapperPassThroughProps & {
    options: Option[];
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    control: any;
    registration: Partial<UseFormRegisterReturn>;
    multiple: boolean;
};
  
export const MultiSelectField = (props : SelectFieldProps)=>{
    const { label, error, control, registration, multiple, options } = props;
    const [selectedItems, setSelectedItems] = useState<Array<Option>>([]);
    
    const removeSelectedItems = (value : number) =>  setSelectedItems(selectedItems.filter(item => item.value != value))
    const handleOnChange = (value : any)=> {
        if(multiple){
            setSelectedItems(value ? value : []) 
        }else{
            setSelectedItems(value ? value[0] : []) 
        }
    }
    const TWMultiValue = ({ innerProps, data } : MultiValueGenericProps) => (
        <div {...innerProps} className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md shadow-sm text-teal-700 bg-teal-100 border border-teal-300 focus:outline-none sm:text-sm'>
            <div className='text-xs font-normal leading-none max-w-full flex-initial'>
                {data.label}
            </div>
            <button type="button" className='flex flex-auto flex-row-reverse' onClick={(event) => removeSelectedItems(data.value)}>
                <XMarkIcon className='fill-current h-4 w-4 ' />
            </button>
        </div>
    ) 

    const TWOption = (props : OptionProps) => {
        const { isSelected, innerProps, data } = props;
        
        return (
            <div {...innerProps} className='cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100'>
                <div className={clsx(
                        'flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative',
                        isSelected ? 'border-teal-600' : ''
                    )}>
                    <div className='w-full items-center flex'>
                        <div className="mx-2 leading-6">
                            {data.label}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const styles : StylesConfig = {
        
    }

    return (
        <FieldWrapper label={label} error={error}>
            <Controller
                control={control}
                {...registration}
                defaultValue={selectedItems}
                render={({ field : { name, onChange, value } })=>{
                    // console.log(value)
                    return (
                        <Select 
                            components={{
                                Option : TWOption,
                                MultiValue : TWMultiValue,
                            }}
                            name={name}
                            value={selectedItems}
                            onChange={(values)=>{
                                onChange(values);
                                handleOnChange(values);
                            }}
                            options={options}
                            isMulti={multiple}
                            styles={styles}
                            className='my-2 border border-gray-100 bg-white rounded relative w-full'
                        />
                )}}
            />
        </FieldWrapper>
            
    )
}