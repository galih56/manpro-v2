import React, { ChangeEventHandler, Fragment, useEffect, useRef, useState } from 'react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import { 
  DayPicker, DayPickerProps, useInput,
  DayPickerDefaultProps, DayPickerSingleProps, DayPickerRangeProps, DateRange, SelectRangeEventHandler, SelectSingleEventHandler, SelectMultipleEventHandler
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Popover as UIPopover, Transition } from '@headlessui/react'
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';


export type DateFieldProps = {
  required?: boolean;
  placeholder?: string;
  className?: string;
} & FieldWrapperPassThroughProps ;



export type DatePickerProps = {
  required?: boolean;
  placeholder?: string;
  className?: string;
} &  DayPickerProps & FieldWrapperPassThroughProps ;


export const DateField = ({ label, error, placeholder, required, description, className } : DateFieldProps) => {
  return (
    <FieldWrapper label={"Start"} error={error}>
      <div className="relative">
          <input type="text" 
            className={
              clsx(
                "w-full appearance-none px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                className
              )} 
            placeholder="Select date" 
          />
          <div className="absolute inset-y-2 right-0 px-2">
            <XMarkIcon  className="h-6 w-6 opacity-30"/>
          </div>
      </div>
    </FieldWrapper>
  )
}


export const DatePicker = ({ mode = 'single',  required=false, className , label = "Select date...", error} : DatePickerProps)=>{
  const panelRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<Date | Date[] | DateRange | undefined>();
  
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const handlePopoverToggle = () => {
    setPopoverOpen(!popoverOpen);
    if(popoverOpen && panelRef.current) panelRef.current.scrollIntoView();
  }

  const handleClickOutside = (event : any) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      event.stopPropagation()
      setPopoverOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  },[]);

  const handleSingleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelected(date);
    }
  };

  const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelected({ from: undefined, to: undefined });
    }
    if (selected?.to && isAfter(date, selected.to)) {
      setSelected({ from: selected.to, to: date });
    } else {
      setSelected({ from: date, to: selected?.to });
    }
  };

  const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelected({ from: selected?.from, to: undefined });
    }
    if (selected?.from && isBefore(date, selected.from)) {
      setSelected({ from: date, to: selected.from });
    } else {
      setSelected({ from: selected?.from, to: date });
    }
  };

  const handleSelect: SelectSingleEventHandler | SelectRangeEventHandler | SelectMultipleEventHandler = (
    value: DateRange | undefined
  ) => {
    setSelected(value);
  };

  const Footer = () => {
      if(mode === "single"){
        return (
          <FieldWrapper label={"Start"} error={error}>
            <div className="relative">
                <input type="text" 
                  className={
                    clsx(
                      "w-full appearance-none px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                      className
                    )} 
                  placeholder="Select date" 
                  onChange={handleSingleChange}
                />
                <div className="absolute inset-y-2 right-0 px-2">
                   <XMarkIcon  className="h-6 w-6 opacity-30"/> 
                </div>
            </div>
          </FieldWrapper>
        )
      }

      if(mode === "range"){
        return (
          <>
            
            <FieldWrapper label={"Start"} error={error}>
              <div className="relative">
                  <input type="text" 
                    className={
                      clsx(
                        "w-full appearance-none px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                        className
                      )} 
                    placeholder="Select date" 
                    onChange={handleFromChange}
                  />
                  <div className="absolute inset-y-2 right-0 px-2">
                      { popoverOpen ?  <XMarkIcon  className="h-6 w-6 opacity-30"/> : <CalendarIcon className="h-6 w-6 opacity-30"/>}
                  </div>
              </div>
            </FieldWrapper>
              
            <FieldWrapper label={"Start"} error={error}>
              <div className="relative">
                  <input type="text" 
                    className={
                      clsx(
                        "w-full appearance-none px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                        className
                      )} 
                    placeholder="Select date" 
                    onChange={handleToChange}
                  />
                  <div className="absolute inset-y-2 right-0 px-2">
                      { popoverOpen ?  <XMarkIcon  className="h-6 w-6 opacity-30"/> : <CalendarIcon className="h-6 w-6 opacity-30"/>}
                  </div>
              </div>
            </FieldWrapper>
          </>
        )
    }
    return null;
  }

  return (
    <>
      <UIPopover>
        <div className="inline-flex">
          <div className="hover:cursor-pointer text-right " onClick={handlePopoverToggle}>
            { selected ? (
              <label className={
                clsx(
                  "w-full appearance-none px-3 shadow-sm focus:outline-none sm:text-sm",
                  className
                )} 
              >{label}</label>
            ): (

              <label className={
                clsx(
                  "w-full appearance-none px-3 shadow-sm focus:outline-none sm:text-sm",
                  className
                )} 
              >Select date...</label>
            )}
          </div>
        
          <div className="basis-1/5 px-2 hover:cursor-pointer" onClick={handlePopoverToggle}>
              { popoverOpen ?  <XMarkIcon  className="h-6 w-6 opacity-30"/> : <CalendarIcon className="h-6 w-6 opacity-30"/>}
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-50"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
          show={popoverOpen}
        >
            <UIPopover.Panel ref={panelRef} className={"absolute right-6 z-10 mt-4 rounded-xl bg-white drop-shadow-lg"} static  >
              <DayPicker
                mode={mode}
                selected={selected}
                onSelect={handleSelect}
                footer={<Footer/>}
              />
            </UIPopover.Panel>
        </Transition>
      </UIPopover>
    </>
  );
}


