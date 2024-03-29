import { FieldWrapperPassThroughProps } from "@/components/Form/FieldWrapper";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ChangeEventHandler, ReactNode, useEffect, useState } from "react";
import MaskedInput from "react-text-mask";

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
  
  export const DateField = ({ value, placeholder, required, className, icon, onChange, onBlur, guide=false, keepCharPositions=false, mask } : DateFieldProps) => {
    const [ date, setDate ] =useState<string>(); 
  
    useEffect(()=>{
      if(value) setDate(value)
    },[value])
  
    return (
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
    )
  }