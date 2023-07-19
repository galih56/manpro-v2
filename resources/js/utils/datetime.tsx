import {parse, format, parseISO, isValid } from 'date-fns';
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import zonedTimeToUtc from "date-fns-tz/zonedTimeToUtc";

export function parseWithTimeZone(date : string, format : string, referenceDate : any, timeZone : string) {
  const zonedDate = utcToZonedTime(referenceDate, timeZone);
  const parsedDate = parse(date, format, zonedDate);
  return zonedTimeToUtc(parsedDate, timeZone);
}
export const validateDateFormat = (date : string, format: string) => {
    if(date && format.length == date.length){
        const value = parse(date, format, new Date());
        if(isValid(value)){
            return value
        }
    }
    return null;
}

export const formatDate = (date: number | Date | string) => {
    if(date){
        if(typeof date === "string"){
            date = parseISO(date);
        }
        date = format(date, 'd MMM yyyy');
        return date
    }
    return "";
};

export const formatDateTime = (date: number | Date | string) => {
    if(date){
        if(typeof date === "string"){
            date = parseISO(date);
        }
        date = format(date, 'd MMM yyyy hh:mm:ss');
        return date
    }
    return "";
};

export const convertDates = (data : any, callback  : Function | null) : any=> {
  if (data instanceof Array) {
    return data.map((item) => convertDates(item,callback));
  } else if (data instanceof Object) {
    for (const key in data) {
        // const date = parseWithTimeZone(data[key], "yyyy-MM-dd'T'HH:mm:ssXXX", new Date(), "UTC");
        const date = parseISO(data[key]);
        
        if (isValid(date)) {
            data[key] = date;
        } else if (typeof data[key] === "object") {
            data[key] = convertDates(data[key],callback);
        }
        console.log(callback)
        // use callback to do extra data manipulation
        if(callback){ 
            data = callback(key, data);
        }
    }
  }
  return data;
};
export const wait = (time : number) => new Promise(resolve => setTimeout(resolve, time));
