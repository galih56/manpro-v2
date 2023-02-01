
export type NotificationType = {
    id? : string,
    title? : string,
    type: 'info' | 'warning' | 'success' | 'error',
    message? : string
}

export interface Props {
}
export interface HTTPErrorResponse  {
    message?: string;
    status?: string;
};