import { ContentLayout } from '@/components/Layout';

import { CreateProject } from '../components/CreateProject';
import { ProjectsList } from '../components/ProjectsList';

export const Projects = () => {
  return (
    <ContentLayout title="Projects">
      <div className="flex justify-end">
        <CreateProject />
      </div>
      <div className="mt-4">
        <ProjectsList />
      </div>
    </ContentLayout>
  );
};
