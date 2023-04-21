import React, { ChangeEventHandler, Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import { 
  DayPicker, DayPickerProps, useInput,
  DayPickerDefaultProps, DayPickerSingleProps, DayPickerRangeProps, DateRange, SelectRangeEventHandler, SelectSingleEventHandler, SelectMultipleEventHandler
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Popover as UIPopover, Transition } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';
import { usePopper } from 'react-popper';
import MaskedInput from 'react-text-mask'
import { formatDate, validateDateFormat } from '@/utils/datetime';
import { Badge } from '../elements';

export type DateFieldProps = {
  required?: boolean;
  value?: string;
  placeholder?: string;
  className?: string;
  icon? : ReactNode;
  onChange? : ChangeEventHandler<HTMLInputElement>;
  onBlur? : ChangeEventHandler<HTMLInputElement>;
  mask? : string | (string | RegExp)[];
  guide?: boolean;
  keepCharPositions?: boolean;
} & FieldWrapperPassThroughProps ;

export const DateField = ({ value, label, error, placeholder, required, description, className, icon, onChange, onBlur, guide=false, keepCharPositions=false, mask } : DateFieldProps) => {
  const [ date, setDate ] =useState<string>(); 

  useEffect(()=>{
    if(value) setDate(value)
  },[value])

  return (
    <FieldWrapper label={label} error={error} description={description}>
      <MaskedInput
        mask={mask??[/[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        value={date}
        guide={guide}
        showMask={false}
        keepCharPositions={keepCharPositions}
        render={(ref : any, props : any) => (
          <div className="relative">
            <input type="text" 
              className={
                clsx(
                  "w-full appearance-none px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                  className
                )} 
              placeholder="Select date" 
              ref={ref}
              {...props}
            />
            {
              icon  ? (
                <div className="absolute inset-y-2 right-0 px-2">
                  <XMarkIcon  className="h-6 w-6 opacity-30"/>
                </div>
              ) : null
            }
          </div>
        )}
      />
    </FieldWrapper>
  )
}

export type DatePickerProps = {
  required?: boolean;
  dateFormat?: string;
  placeholder?: string;
  className?: string;
  iconPosition? : 'right' | 'left'
} &  DayPickerProps & FieldWrapperPassThroughProps ;


export const DatePicker = ({ mode = 'single', dateFormat= 'dd-MM-yyyy', required=false, className , label = "Select date...", iconPosition='left',  error} : DatePickerProps)=>{
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement : 'top'
  });
  const [selected, setSelected] = useState<Date | Date[] | DateRange | undefined>();

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
    // console.log(selected!.filter((date : Date) => formatDate(date) != formatDate(removedDate)))
    setSelected(selected!.filter((date : Date) => formatDate(date) != formatDate(removedDate)))
  }

  const handleSelect: SelectSingleEventHandler | SelectRangeEventHandler | SelectMultipleEventHandler = (
    value: DateRange | undefined
  ) => {
    setSelected(value);
  };

  const Footer = () => {  
    if(mode === "single"){
      return (
        <FieldWrapper label={label} error={error}>
          <DateField value={selected ? format(selected as Date,"dd-MM-yyyy") : undefined} onChange={handleSingleChange}/>
        </FieldWrapper>
      )
    }

    if(mode === "range"){
      return (
        <div className={'flex'}>
          <div className='mx-1'>
            <FieldWrapper label={label} error={error}>
              <DateField value={selected? format(selected?.from,"dd-MM-yyyy") : undefined} onChange={handleFromChange} />
            </FieldWrapper>
          </div>
          <div className='mx-1'>
            <FieldWrapper label={label} error={error}>
              <DateField value={selected? format(selected?.to,"dd-MM-yyyy") : undefined} onChange={handleToChange}/>
            </FieldWrapper>
          </div>
        </div>
      )
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
                  <SelectedDates mode={mode} selected={selected} label={label} onRemove={handleRemoveDate}/>
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

export type SelectedDateProps = {
  mode: 'default' | 'single' | 'multiple' | 'range';
  label? : string;
  onRemove: (date : Date) => void
  placeholder?: string; 
  selected?: Date | Date[] | DateRange | undefined;
};



const SelectedDates = ({ mode, selected, label, onRemove } : SelectedDateProps) => {
  if(selected) {
    if(mode === 'multiple'){
      return (
        <div className="flex flex-wrap">
          {selected.map((date : Date, i : number)=>(
              <Badge key={`${date.toISOString()}-${i}`} variant='default' className={"inline-flex mt-2"}>
                {formatDate(date)} 
                <XMarkIcon className='h-4 h-4 ml-2 hover:fill-red-900 px-0' onClick={()=> onRemove(date)}/>
              </Badge>
            )
          )}
        </div>
       ); 
     }
     if(mode === 'range'){
       return (
           <div className="inline-flex">
              <label className={
                clsx(
                  "w-full focus:outline-none sm:text-sm",
                )} 
              >
                {formatDate(selected.from)} - {formatDate(selected.to)}
              </label>
           </div>
       )
    }
    if(mode === "single"){
      return (
        <label className={
          clsx(
            "w-full focus:outline-none sm:text-sm",
          )} 
        >{formatDate(selected as Date)}</label>
      )
    }
  }  

  return (
    <label className={
      clsx(
        "w-full focus:outline-none sm:text-sm",
      )} 
    >{label ?? "Select date..."}</label>
  );
}

