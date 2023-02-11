import { ReactNode } from "react"

export interface Props {
    children?: ReactNode
}
  
export type NotificationType = {
    id? : string,
    title? : string,
    type: 'info' | 'warning' | 'success' | 'error',
    message? : string
}