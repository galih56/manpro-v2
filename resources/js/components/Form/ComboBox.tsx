import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'
import { Controller, UseControllerProps, UseFormRegisterReturn, useController } from 'react-hook-form';

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
  
export function ComboBox(props : SelectFieldProps) {
    const { label,  options, error, className, defaultValue, registration, control, multiple } = props;
    const [ query, setQuery ] = useState('');
    const filteredOptions =
        query === ''
        ? options
        : options.filter((option) =>
            option?.label
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
            );
    return (
        <FieldWrapper label={label} error={error}>
            <Controller
                {...registration}
                control={control}
                render={({ field }) => 
                {
                    console.log(field)
                    return (
                    <Combobox 
                        {...field}
                        >
                        <div className="relative mt-1">
                        <div className="relative w-full cursor-default  bg-white text-left focus-visible:ring-white sm:text-sm border-gray-600 focus:border-blue-500">
                            <Combobox.Input
                                className={clsx(
                                    'mt-1 block w-full pl-3 pr-10 py-2 w-full py-2 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm rounded-md',
                                    className
                                )}
                                displayValue={(option) => option?.label}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                <Combobox.Option
                                    key={option.value}
                                    className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                    }`
                                    }
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                            {option.label}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active ? 'text-white' : 'text-teal-600'
                                                }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                    )}
                                </Combobox.Option>
                                ))
                            )}
                            </Combobox.Options>
                        </Transition>
                        </div>
                    </Combobox>
                    )
                }}
            />
            
        </FieldWrapper>
    )
}