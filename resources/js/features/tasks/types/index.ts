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
  project?: Project | null;
  startOn?: Date | string | null ;
  dueOn?: Date | string | null ;
  startedAt?: Date | string | null ;
  completedAt?: Date | string | null ;
  completedBy?: User;
};
