import { BaseEntity } from '@/types';

export type Tag = {
  name: string;
  description?: string;
} & BaseEntity;
