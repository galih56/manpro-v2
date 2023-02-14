import { BaseEntity } from '@/types';

export type User = {
  name: string;
  email: string;
  is_admin: boolean;
} & BaseEntity;
