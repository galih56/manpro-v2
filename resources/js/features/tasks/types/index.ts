import { Label } from '@/features/labels';
import { BaseEntity } from '@/types';

export type Task = {
  title: string;
  description: string;
  labels : Array<Label>
} & BaseEntity;
