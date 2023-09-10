import { Section } from '@/features/sections';
import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export type Project = {
  title: string;
  description: string;
  sections : Section[];
  progress  : number;
  startOn? : Date | string;
  dueOn? : Date | string;
  startedAt? : Date | string;
  dueAt? : Date | string;
  completed : boolean;
  completedAt? : Date | string;
  completedBy? : User;
} & BaseEntity;
