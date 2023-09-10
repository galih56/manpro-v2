import { Project } from '@/features/projects';
import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export type Section = {
  title: string;
  description: string;
  progress: number;
  project?: Project;
  startOn?: Date | string | undefined;
  dueOn?: Date | string | undefined;
  startAt?: Date | string | undefined;
  dueAt?: Date | string | undefined;
  startedAt?: Date | string | undefined;
  completedAt?: Date | string | undefined;
  completedBy?: User;
} & BaseEntity;
