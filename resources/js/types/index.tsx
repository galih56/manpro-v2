import { Task } from "@/features/tasks";
import { ComponentType, ReactNode } from "react"

export interface BaseEntity {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};

export interface Props {
    children?: ReactNode,
    className?: string
}
 
export type PaginationDTO = {
  page? : number;
  limit? : number;
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

export type PaginationType<Entry> = {
    hasMore : boolean;
    items : Entry[];
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

export type ExtractProps<T> = T extends ComponentType<infer P> ? P : T
