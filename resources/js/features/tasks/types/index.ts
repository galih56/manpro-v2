import { BaseEntity } from '@/types';

export type Task = {
  title: string;
  description: string;
} & BaseEntity;
