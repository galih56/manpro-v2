import { BaseEntity } from '@/types';

export type Label = {
  name: string;
  description: string;
} & BaseEntity;
