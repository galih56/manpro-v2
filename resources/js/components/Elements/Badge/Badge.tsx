import clsx from 'clsx';
import * as React from 'react';
import { Props } from '@/types'

const variants = {
  default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  dark: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  custom: '',
};

const sizes = {
  md: 'text-xs font-medium',
  lg: 'text-sm font-medium',
};


export type BadgeProps = React.HTMLAttributes<HTMLElement> & {
  title? : string;
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & Props;

export const Badge = ( {  className = '', variant = 'default', size = 'md', title, children, ...props } : BadgeProps ) => {
    return (
        <span 

            className={clsx(
                "rounded align-middle mx-1 px-1.5 py-0.5",
                variants[variant],
                sizes[size],
                className
            )}
        >{title}{children}</span>
    );
}

Badge.displayName = 'Badge';
