import { Tag } from '@/features/tags';
import { Project } from '@/features/projects';
import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export interface Task extends BaseEntity{
  title: string;
  description: string;
  tags : Array<Tag>
  assignees : Array<User>;
  progress: number;
  project?: Project;
  startOn?: string;
  dueOn?: string;
  startAt?: string;
  dueAt?: string;
  startedAt?: string;
  completedAt?: string;
  completedBy?: User;
  createdAt: string;
  updatedAt: string;
};
