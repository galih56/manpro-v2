import { formatDate } from "@/utils/datetime";
import { Badge } from "../Badge";
import clsx from "clsx";
import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-day-picker";

export type DateDisplayProps = {
  name?: string;
  mode: 'single' | 'multiple' | 'range';
  onRemove: (date : Date) => void
  placeholder?: string; 
  dates?: Date | Date[] | DateRange | undefined;
};


export const DateDisplay = ({name, mode, dates, placeholder, onRemove } : DateDisplayProps) => {
  if(dates) {
    if(mode === 'multiple'){
      return (
        <div className="flex flex-wrap">
          {dates.map((date : Date, i : number)=>(
              <Badge key={`${date.toISOString()}-${i}`} variant='default' className={"inline-flex mt-2"}>
                {formatDate(date)} 
                {name && <input name={`${name}[]`} type="hidden" value={formatDate(date, 'dd-MM-yyyy')} />}
                <XMarkIcon className='h-4 ml-2 hover:fill-red-900 px-0' onClick={()=> onRemove(date)}/>
              </Badge>
            )
          )}
        </div>
       ); 
     }
     if(mode === 'range'){
      var from = dates.from;  
      var to = dates.to;  
      
      if(!(from && to)){
        return (
          <div className="inline-flex">
            <label className={
              clsx(
                "w-full focus:outline-none sm:text-sm",
              )} 
            >
              {formatDate(dates.from)} - {formatDate(dates.to)}
            </label>
          </div>
        )
      }
      
      from = formatDate(dates.from);
      to = formatDate(dates.to);
      return (
           <div className="inline-flex">
              <label className={
                clsx(
                  "w-full focus:outline-none sm:text-sm",
                )} 
              >
                {from} - {to}
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
        >{formatDate(dates as Date)}</label>
      )
    }
  }  

  return (
    <label className={
      clsx(
        "w-full focus:outline-none sm:text-sm",
      )} 
    >{placeholder ?? "Select date..."}</label>
  );
}

