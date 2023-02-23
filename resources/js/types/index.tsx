import { ReactNode } from "react"

export type BaseEntity = {
    id: string;
    createdAt: number;
    updatedAt: number;
    // createdAt: Date;
    // updatedAt: Date;
};

export interface Props {
    children?: ReactNode
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