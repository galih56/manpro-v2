import { BaseEntity } from '@/types';

export type Project = {
  title: string;
  description: string;
} & BaseEntity;
