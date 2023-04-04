import {parse, format, parseISO} from 'date-fns';

export const formatDate = (date: string) => format(parseISO(date),'d MMM yyyy');
export const formatDateTime = (date: string) => format(parseISO(date),'d MMM yyyy hh:mm:ss');

export const wait = (time : number) => new Promise(resolve => setTimeout(resolve, time));
