import { Section } from '@/features/sections';
import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export type Project = {
  title: string;
  description: string;
  sections : Section[];
  progress  : number;
  startOn : Date | string | null;
  dueOn : Date | string | null;
  startedAt : Date | string | null;
  dueAt : Date | string | null;
  completed : boolean;
  completedAt : Date | string | null;
  completedBy : User | null;
} & BaseEntity;
