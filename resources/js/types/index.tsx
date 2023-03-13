import { Task } from "@/features/tasks";
import { ReactNode } from "react"

export type BaseEntity = {
    id: string;
    createdAt: number;
    updatedAt: number;
    // createdAt: Date;
    // updatedAt: Date;
};

export interface Props {
    children?: ReactNode,
    className?: string
}
 
export type AppProviderProps = {
    children: React.ReactNode;
}; 

export type NotificationType = {
    id? : string,
    title? : string,
    type: 'info' | 'warning' | 'success' | 'error',
    message? : string
}

export type PaginationType = {
    hasMore : boolean;
    items : Task[];
    total : number;
    perPage : number;
    currentPage : number;
    totalPages : number;
    lastPage : number;
    nextPageUrl : string;
    prevPageUrl : string;
    onFirstPage : boolean;
    onLastPage : boolean; 
    path : string;
    links : [];
}