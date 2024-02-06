import { formatDate } from "@/utils/datetime";
import { Badge } from "@tremor/react";
import clsx from "clsx";
import { ReactNode } from "react";

export type DateRange = {
    from: Date | undefined;
    to?: Date | undefined;
};


export type DateDisplayProps = {
    mode: 'single' | 'multiple' | 'range';
    placeholder?: string; 
    data?: Date | Date[] | DateRange | undefined;
    /*
    *   Use this if you don't want to use Badge Component
    */
    CustomBadge?: (date : Date, index :number ) => React.ReactNode;
};
  
export const DateDisplay = ( { mode, placeholder, data, CustomBadge } : DateDisplayProps)=>{
  if(data) {
    if(mode === 'multiple'){
      return (
        <div className="flex flex-wrap">
          {data.map((date : Date, i : number)=>(
              CustomBadge ? 
                CustomBadge(date, i)
                : 
                <Badge key={`${date.toISOString()}-${i}`}  className={"inline-flex"}>
                    {formatDate(date)} 
                </Badge>
            )
          )}
        </div>
       ); 
     }
     
     if(mode === 'range'){
        const to = formatDate(data.to)
        const from = formatDate(data.from);

        const toSplit = to.split(" ");
        const fromSplit = from.split(" ");

        const toMonthYear = `${toSplit[1]} ${toSplit[2]}`;
        const fromMonthYear = `${fromSplit[1]} ${fromSplit[2]}`;

        var dates = "";
        if(toMonthYear == fromMonthYear){
            dates = `${fromSplit[0]} - ${toSplit[0]} ${fromSplit[1]} ${fromSplit[2]}`;
        }
        else dates = `${from} - ${to}`;

        return (
           <div className="inline-flex">
              <label className={
                clsx(
                  "w-full focus:outline-none sm:text-sm",
                )} 
              >
                {dates}
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
        >{formatDate(data as Date)}</label>
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