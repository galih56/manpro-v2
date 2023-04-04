import { XMarkIcon, ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/solid'
import { FieldWrapperPassThroughProps } from './FieldWrapper';
import { Controller, UseFormRegisterReturn, useForm } from 'react-hook-form';
import Select, { components, OptionProps, MultiValueGenericProps, MultiValueRemoveProps, StylesConfig } from 'react-select';
import clsx from 'clsx';
import { FieldWrapper } from './FieldWrapper';
import { useState } from 'react';

export type Option = {
    label: React.ReactNode;
    value: string;
};

export type SelectFieldProps = FieldWrapperPassThroughProps & {
    name?: string;
    options: Option[];
    className?: string;
    defaultValue?: string | string[];
    placeholder?: string;
    control?: any;
    registration?: Partial<UseFormRegisterReturn>;
    multiple?: boolean;
    onChange?: (values : string | string[] | undefined)=> void;
};
  

export const SelectField = ({ label, error, name, control, registration, multiple, options, defaultValue, placeholder, onChange } : SelectFieldProps)=>{
    var defaultSelectedValue : Option | Option[] | undefined= undefined;
    if(multiple){
        const values = defaultValue ?? [] ;
        defaultSelectedValue = options.filter((option : Option) => {
            if(values.includes(option.value)) return option;
        })
    }else{
        defaultSelectedValue = options.filter((option : Option) => {
            if(option.value == defaultValue) return option;
        });
        defaultSelectedValue = defaultSelectedValue[0] as Option
    }


    const [ selectedValues, setSelectedVales ] = useState<Option | Option[] | undefined>(defaultSelectedValue);
    
    const TWMultiValueContainer = (props : MultiValueGenericProps) => (
        <components.MultiValueContainer {...props}>
        <div {...props.innerProps} className='flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md shadow-sm text-teal-700 bg-teal-100 border border-teal-300 focus:outline-none sm:text-sm'>
                {props.children}
        </div>
        </components.MultiValueContainer>
    )

    const TWMultiValueLabel = (props : MultiValueGenericProps) => (
        <components.MultiValueLabel {...props} >
            <div className='text-xs font-normal leading-none max-w-full flex-initial'>
                {props.data.label}
            </div>
        </components.MultiValueLabel>
    ) 
    
    const TWMultiValueRemove = (props : MultiValueRemoveProps) => (
        <components.MultiValueRemove {...props}>
            <button type="button" className='flex flex-auto flex-row-reverse'>
                <XMarkIcon className='fill-current h-4 w-4 ' />
            </button>
        </components.MultiValueRemove>
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
                            {data!.label}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const styles : StylesConfig = {
        multiValue : (base) => ({
            backgroundColor : 'transparent'
        }),
        multiValueRemove : (base) => ({
            backgroundColor : 'transparent',
            '&:hover' : {
                backgroundColor : 'transparent'
            }
        })   
    }

    if(control && registration){
        return (
            <FieldWrapper label={label} error={error}>                
                <Controller
                    control={control}
                    name={registration.name!}
                    defaultValue={defaultValue}
                    render={({ field : {value, name, onChange, onBlur, ref } })=>{
                        return (
                            <Select 
                                components={{
                                    Option : TWOption,
                                    MultiValueContainer : TWMultiValueContainer,
                                    MultiValueLabel : TWMultiValueLabel,
                                    MultiValueRemove : TWMultiValueRemove 
                                    
                                }}
                                name={name}
                                value={selectedValues}
                                onChange={(options : any)=>{
                                    var values = undefined;
                                    if(multiple){
                                        values = options.map((option : Option) => option.value) as number[] ?? [];
                                    }else{
                                        values = options.value as number ?? undefined;
                                    }
                                    if(onChange) onChange(values)
                                    setSelectedVales(options);
                                }}
                                onBlur={onBlur}
                                ref={ref}
                                options={options}
                                isMulti={multiple}
                                styles={styles}
                                className={clsx('border border-gray-100 bg-white rounded relative w-full')}
                                classNames={{
                                    multiValue : (state) => 'bg-transparent',
                                    multiValueRemove : (state)=>{
                                        return 'bg-teal-100 hover:bg-teal-100'
                                    }
                                }}
                                placeholder={placeholder}
                            />
                    )}}
                />
            </FieldWrapper>
        )
    }else{
        return (
            <FieldWrapper label={label} error={error}>                
                <Select
                    components={{
                        Option : TWOption,
                        MultiValueContainer : TWMultiValueContainer,
                        MultiValueLabel : TWMultiValueLabel,
                        MultiValueRemove : TWMultiValueRemove 
                        
                    }}
                    name={name}
                    value={selectedValues}
                    onChange={(options : any)=>{
                        var values = undefined;
                        if(multiple){
                            values = options.map((option : Option) => option.value) ?? [];
                        }else{
                            values = options.value ?? undefined;
                        }
                        if(onChange) onChange(values)
                        setSelectedVales(options);
                    }}
                    options={options}
                    isMulti={multiple}
                    styles={styles}
                    className={clsx('border border-gray-100 bg-white rounded relative w-full')}
                    classNames={{
                        multiValue : (state) => 'bg-transparent',
                        multiValueRemove : (state)=>{
                            return 'bg-teal-100 hover:bg-teal-100'
                        }
                    }}
                    placeholder={placeholder}
                />
            </FieldWrapper>

        )
    }

}