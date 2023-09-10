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

export const formatDate = (date: number | Date | string, stringFormat : string = "d MMM yyyy") => {
    if(date){
        if(typeof date === "string"){
            date = parseISO(date);
        }
        date = format(date, stringFormat);
        return date
    }
    return "";
};

export const formatDateTime = (date: number | Date | string, stringFormat : string = 'd MMM yyyy hh:mm:ss') => {
    if(date){
        if(typeof date === "string"){
            date = parseISO(date);
        }
        date = format(date, stringFormat);
        return date
    }
    return "";
};

export const convertDates = (data : any) : any=> {
  if (data instanceof Array) {
    return data.map((item) => convertDates(item));
  } else if (data instanceof Object) {
    for (const key in data) {
        // const date = parseWithTimeZone(data[key], "yyyy-MM-dd'T'HH:mm:ssXXX", new Date(), "UTC");
        const date = parseISO(data[key]);
        
        if (isValid(date)) {
            data[key] = date;
        } else if (typeof data[key] === "object") {
            data[key] = convertDates(data[key]);
        }
    }
  }
  return data;
};
export const wait = (time : number) => new Promise(resolve => setTimeout(resolve, time));
