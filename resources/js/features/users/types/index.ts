import { BaseEntity } from '@/types';

export type User = {
  name: string;
  email: string;
  is_admin: boolean;
  roles : Array<Role>
} & BaseEntity;


export type Role = {
  name: string;
} & BaseEntity;

