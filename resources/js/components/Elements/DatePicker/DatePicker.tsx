import React, { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import { format, isAfter, isBefore } from 'date-fns';
import { 
  DayPicker, DayPickerProps,  DateRange, SelectRangeEventHandler, SelectSingleEventHandler, SelectMultipleEventHandler
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Popover as UIPopover, Transition } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { FieldWrapper, FieldWrapperPassThroughProps } from './../../Form/FieldWrapper';
import { usePopper } from 'react-popper';
import { formatDate, validateDateFormat } from '@/utils/datetime';
import { Badge } from '..';
import {  Controller } from 'react-hook-form';
import { DateDisplay } from '../DateDisplay';
import { DateField } from '../DateField';


export type DatePickerProps = {
  defaultValue? : SelectedDate;
  value? : SelectedDate;
  onChange? : (value : SelectedDate) => void;
  name: string;
  control : any;
  className?: string;
  mode: 'single' | 'multiple' | 'range';
  label: string;
  dateFormat?: string;
  placeholder?: string;
  iconPosition? : 'right' | 'left';
} & DayPickerProps & FieldWrapperPassThroughProps ;

export const DatePicker = ({ mode = 'single', dateFormat= 'dd-MM-yyyy', defaultValue, label, 
  iconPosition='left',  error, name, control, placeholder, onChange, value
} : DatePickerProps) => {
  
  
  if(!control) return (
    <FieldWrapper label={label} error={error}>
      <DatePickerPopover 
        mode={mode}
        dateFormat={dateFormat}
        label={label}
        iconPosition={iconPosition}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </FieldWrapper>
  )


  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        return (
          <FieldWrapper label={label} error={error}>
            <DatePickerPopover 
              mode={mode}
              dateFormat={dateFormat}
              label={label}
              iconPosition={iconPosition}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
            />
          </FieldWrapper>
        )}}
      />
    )
}

type SelectedDate = Date | Date[] | DateRange | undefined;

export type DatePickerPopoverProps = {
  defaultValue? : SelectedDate;
  value? : SelectedDate;
  name?: string;
  control? : any;
  onChange? : (value : SelectedDate) => void;
  placeholder? : string;
} & DatePickerProps;

type CustomBadgeProps = {
  key: string;
  className? : string;
  children: React.ReactNode;
  onRemove: () => void
}

export const DatePickerPopover = ({ 
    mode = 'single', dateFormat= 'dd-MM-yyyy', defaultValue, label, 
    iconPosition='left',  onChange, placeholder, value
  } : DatePickerPopoverProps)=>{
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement : 'auto'
  });
  const [selected, setSelected] = useState<SelectedDate>(defaultValue);

  useEffect(()=>{
    if(onChange) onChange(selected)
  },[selected])


  const handleSingleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = validateDateFormat(e.target.value,dateFormat);
    if (date) {
      return setSelected(date);
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


  const CustomBadge = ( { 
      onRemove,
      children
  } : CustomBadgeProps )=>{
      return (
          <Badge variant='default' className={"inline-flex"}>
              {children}
              <XMarkIcon className='h-4 ml-2 hover:fill-red-900 px-0' onClick={() => onRemove()}/>
          </Badge>
      )
  }

  const Footer = () => {  
    if(mode === "single"){
      return (
        <FieldWrapper label={label}>
          <DateField value={selected ? format(selected as Date,"dd-MM-yyyy") : undefined} onChange={handleSingleChange}/>
        </FieldWrapper>
      )
    }

    if(mode === "range"){
      return (
        <div className={'flex'}>
          <div className='mx-1'>
            <FieldWrapper label={"Start Date"}>
              <DateField value={selected && selected!.from? format(selected?.from,"dd-MM-yyyy") : undefined} onChange={handleFromChange} />
            </FieldWrapper>
          </div>
          <div className='mx-1'>
            <FieldWrapper label={"End Date"}>
              <DateField value={selected && selected!.to? format(selected?.to,"dd-MM-yyyy") : undefined} onChange={handleToChange}/>
            </FieldWrapper>
          </div>
        </div>
      )
    }

    if(mode === "multiple"){
      return <DateDisplay 
        mode={mode} 
        data={selected} 
        placeholder={placeholder}
        CustomBadge={ (date, i) =>  <CustomBadge key={`${date.toISOString()}-${i}`} onRemove={() => handleRemoveDate(date)}   > {formatDate(date)} </CustomBadge>}
        />
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
                <div className="hover:cursor-pointer text-right align-middle items-center mx-2">
                  <DateDisplay 
                    mode={mode} data={selected} 
                    placeholder={placeholder} 
                    CustomBadge={ (date, i) =>  <CustomBadge key={`${date.toISOString()}-${i}`} onRemove={() => handleRemoveDate(date)}   > {formatDate(date)} </CustomBadge>}
                  />
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
