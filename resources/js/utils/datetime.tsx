import {parse, format, parseISO, isValid} from 'date-fns';

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

export const wait = (time : number) => new Promise(resolve => setTimeout(resolve, time));
