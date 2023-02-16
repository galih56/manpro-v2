import clsx from 'clsx';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
  multiple: boolean;
};

export const MultiSelectField = (props: SelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration, placeholder, multiple } = props;
  return (
    <FieldWrapper label={label} error={error}>
        <div className="w-full flex flex-col items-center h-64 mx-auto">
            <div className="w-full px-4">
                <div className="flex flex-col items-center relative">
                    <div className="w-full ">
                        <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
                            <div className="flex flex-auto flex-wrap">
                                <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                    <div className="text-xs font-normal leading-none max-w-full flex-initial">HTML</div>
                                    <div className="flex flex-auto flex-row-reverse">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                    <div className="text-xs font-normal leading-none max-w-full flex-initial">Ruby</div>
                                    <div className="flex flex-auto flex-row-reverse">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                    <div className="text-xs font-normal leading-none max-w-full flex-initial">Javascript</div>
                                    <div className="flex flex-auto flex-row-reverse">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <input type='text' placeholder="" className="bg-transparent p-1 px-2 appearance-none outline-none focus:outline-none h-full w-full text-gray-800 border-none border-transparent focus:border-transparent focus:ring-0" />
                                </div>
                            </div>
                            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                                <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                        <polyline points="18 15 12 9 6 15"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select">
                        <div className="flex flex-col w-full">
                            <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">Python </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative border-teal-600">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">Javascript </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative border-teal-600">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">Ruby </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">JAVA </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">ASP.Net </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">C++ </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">SQL </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100">
                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative border-teal-600">
                                    <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">HTML </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FieldWrapper>
  );
};
