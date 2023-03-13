import { BaseEntity } from '@/types';

export type Role = {
  name: string;
  code: string;
} & BaseEntity;
