import { Project } from '@/features/projects';
import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export type Section = {
  title: string;
  description: string;
  progress: number;
  project?: Project;
  startOn?: Date | string | null ;
  dueOn?: Date | string | null ;
  startAt?: Date | string | null ;
  dueAt?: Date | string | null ;
  startedAt?: Date | string | null ;
  completedAt?: Date | string | null ;
  completedBy?: User;
} & BaseEntity;
