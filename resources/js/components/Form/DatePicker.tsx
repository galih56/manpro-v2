import React, { Fragment, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { 
  DayPicker, DayPickerProps,
  DayPickerDefaultProps, DayPickerSingleProps, DayPickerRangeProps
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Popover as UIPopover, Transition } from '@headlessui/react'
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export type DatePickerProps = {
  placeholder?: string;
} &  DayPickerProps ;

export const DatePicker = ({ mode = 'single'} : DatePickerProps)=>{
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<any>();
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const closeDatePicker = () => {
    return divRef.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true
      })
    )
  }

  const handlePopoverToggle = () => {
    setPopoverOpen(!popoverOpen);
    if(popoverOpen && divRef.current) divRef.current.scrollIntoView();
  }
  const handlePopoverClose = () => setPopoverOpen(false);
  
  useEffect(()=>{
    if(popoverOpen && inputRef.current) inputRef.current.focus();
    console.log(popoverOpen)
  }, [popoverOpen])

  return (
    <>
    <UIPopover>
      <div className="relative">
          <input type="text" 
            className="w-full appearance-none block px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            placeholder="Select date" 
            onFocus={() => setPopoverOpen(true)}
            ref={inputRef}
          />
          
          <div className="absolute inset-y-2 right-0 px-2" ref={divRef} onClick={handlePopoverToggle}>
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
            <UIPopover.Panel className={"absolute right-6 z-10 mt-4 rounded-xl bg-white drop-shadow-lg"} static >
              <DayPicker
                mode={mode}
                selected={selected}
                onSelect={setSelected}
              />
            </UIPopover.Panel>
        </Transition>
    </UIPopover>
    </>
  );
}