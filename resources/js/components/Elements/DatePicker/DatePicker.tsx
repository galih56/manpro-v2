import React, { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import { format, isAfter, isBefore } from 'date-fns';
import { 
  DayPicker, DayPickerProps, SelectRangeEventHandler, SelectSingleEventHandler, SelectMultipleEventHandler
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Popover as UIPopover, Transition } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { FieldWrapper, FieldWrapperPassThroughProps } from '../../Form/FieldWrapper';
import { usePopper } from 'react-popper';
import MaskedInput from 'react-text-mask'
import { formatDate, validateDateFormat } from '@/utils/datetime';
import { Badge } from '..';
import { useFormContext, Controller, UseFormRegisterReturn, Control } from 'react-hook-form';
import { DateDisplay } from '../DateDisplay';
import { DateField } from '../DateField';
import { useController } from "react-hook-form";


export type DateRange = {
  from?: Date | null | undefined;
  to?: Date | null | undefined;
};

export type DatePickerProps = {
  defaultValue? : Date | Date[] | DateRange;
  control? : any;
  className?: string;
  mode: 'single' | 'multiple' | 'range';
  label: string;
  dateFormat?: string;
  placeholder?: string;
  iconPosition? : 'right' | 'left';
  name: string | [string, string];
} & DayPickerProps & FieldWrapperPassThroughProps ;

export const DatePicker = ({ 
  name, error, control,
  mode = 'single', dateFormat= 'dd-MM-yyyy', 
  label = "Select date...", iconPosition='left',
  defaultValue,  
} : DatePickerProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <DatePickerPopover 
        mode={mode}
        dateFormat={dateFormat}
        label={label}
        iconPosition={iconPosition}
        control={control}
        name={name}
        defaultValue={defaultValue}
      />
    </FieldWrapper>
    )
}

type SelectedDate = Date | Date[] | DateRange | undefined;

export type DatePickerPopoverProps = {
  name: string | [string, string];
  control? : any;
  onChange? : (value : SelectedDate) => void;
} & DatePickerProps;

export const DatePickerPopover = ({ 
    name, defaultValue,
    mode = 'single', dateFormat= 'dd-MM-yyyy', 
    label = "Select date...", control,
    iconPosition='left',  onChange
  } : DatePickerPopoverProps)=>{
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement : 'auto'
  });
  const [selected, setSelected] = useState<SelectedDate>(defaultValue);

  const handleSingleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = validateDateFormat(e.target.value,dateFormat);
    if (date) {
      setSelected(date);
    }
  };

  const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = validateDateFormat(e.target.value,dateFormat);

    if(date){
      if (selected?.to && isAfter(date, selected.to)) {
        setSelected({ from: selected.to, to: date });
      } else {
        setSelected({ from: date, to: selected?.to });
      }
    }else{
      setSelected({ from: undefined, to: undefined });
    }
  };

  const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = validateDateFormat(e.target.value,dateFormat);

    if(date){
      if (selected?.from && isBefore(date, selected.from)) {
        setSelected({ from: date, to: selected.from });
      } else {
        setSelected({ from: selected?.from, to: date });
      }
    }else{
      setSelected({ from: selected?.from, to: undefined });
    }
  };
  
  const handleRemoveDate = ( removedDate : Date)=> {
    setSelected(selected!.filter((date : Date) => formatDate(date) != formatDate(removedDate)))
  }

  const handleSelect: SelectSingleEventHandler | SelectRangeEventHandler | SelectMultipleEventHandler = (
    value: DateRange | undefined
  ) => {
    setSelected(value);
  };

  const Footer = () => {
    if(mode === "single"){
      const { field } = useController({ name : name as string, control: control, defaultValue : defaultValue });
      
      useEffect(()=>{
        if(field) field.onChange(selected)
      },[]);
      
      useEffect(()=>{
        if(onChange) onChange(selected)
        if(field) field.onChange(selected)
      },[selected])
        
      if(!(typeof name == 'string')) return (<span className={'text-red-700'}>Input Name must be an array</span>);
        
      return (
        <FieldWrapper label={label}>
          <DateField name={field.name} value={selected ? format(selected as Date,"dd-MM-yyyy") : undefined} onChange={handleSingleChange}/>
        </FieldWrapper> 
      )
    }

    if(mode === "multiple"){
      if(!(typeof name == 'string')) return ( <span className={'text-red-700'}>Input Name must be an array</span>);
      return <DateDisplay mode={mode} dates={selected as Date[]} onRemove={handleRemoveDate}/>
    }
      
    if(mode === "range"){  
      if(!Array.isArray(name)){
        return (
          <span className={'text-red-700'}>Input Name must be an array</span>
        )
      }else{
        const { field : startField } = useController({ name : name[0], control: control, defaultValue : defaultValue!.from });
        const { field : endField } = useController({ name : name[1], control: control, defaultValue : defaultValue!.to });
        
        useEffect(()=>{
          if(onChange) onChange(selected)
          if(selected){
            if(startField && selected.from) startField.onChange(selected!.from);
            if(endField && selected.to) endField.onChange(selected!.to);
          }
        },[])

        useEffect(()=>{
          if(onChange) onChange(selected)
          if(selected){
            if(startField && selected.from) startField.onChange(selected!.from);
            if(endField && selected.to) endField.onChange(selected!.to);
          }
        },[selected])
        
    
        return (
          <div className={'flex'}>
            <div className='mx-1'>
              <FieldWrapper label={"Start Date"}>
                <DateField name={startField.name} value={selected && selected!.from? format(selected?.from,"dd-MM-yyyy") : undefined} onChange={handleFromChange} />
              </FieldWrapper>
            </div>
            <div className='mx-1'>
              <FieldWrapper label={"End Date"}>
                <DateField name={endField.name} value={selected && selected!.to? format(selected?.to,"dd-MM-yyyy") : undefined} onChange={handleToChange}/>
              </FieldWrapper>
            </div>
          </div>
        )
      }
    } 

    return null;
  }
   

  return (
    <>
      <UIPopover>
        {({ open }) => (
          <>
            <div className={"inline-flex align-middle"}>
              <UIPopover.Button  ref={setReferenceElement}  
                  className={clsx(
                    "px-2 hover:cursor-pointer",
                    iconPosition == "left"? "flex-row-reverse" : "" 
                  )}>
                    { open ?  <XMarkIcon  className="h-6 w-6 opacity-30"/> : <CalendarIcon className="h-6 w-6 opacity-30"/>}
                </UIPopover.Button>
                <div className="hover:cursor-pointer text-right align-middle mx-2">
                  <DateDisplay mode={mode} dates={selected} label={label} onRemove={handleRemoveDate}/>
                </div>
            </div>
            <UIPopover.Panel 
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className={" z-40 mt-2 mb-6 mx-2 rounded-xl bg-white drop-shadow-lg"} 
              >
              <DayPicker
                mode={mode}
                selected={selected}
                onSelect={handleSelect}
                footer={<Footer/>}
              />
            </UIPopover.Panel>
          </>
        )}
      </UIPopover>
    </>
  );
}
