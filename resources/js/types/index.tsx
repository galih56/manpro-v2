
export type NotificationType = {
    id? : string,
    title? : string,
    type: 'info' | 'warning' | 'success' | 'error',
    message? : string
}