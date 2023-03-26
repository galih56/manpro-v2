import { Label } from '@/features/labels';
import { Project } from '@/features/projects';
import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export interface Task extends BaseEntity{
  title: string;
  description: string;
  labels : Array<Label>
  assignees : Array<User>;
  project: Project
};
