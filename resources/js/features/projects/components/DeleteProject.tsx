import { TrashIcon } from '@heroicons/react/24/solid';
import { Button } from "@tremor/react";
import {  ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteProject } from '../api/deleteProject';

type DeleteProjectProps = {
  id: string;
};

export const DeleteProject = ({ id }: DeleteProjectProps) => {
  const deleteProjectMutation = useDeleteProject();

  return (
    // <Authorization allowedProjects={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Project"
        body="Are you sure you want to delete this task?"
        triggerButton={
          <Button variant="secondary" icon={TrashIcon} />
        }
        confirmButton={
          <Button
            loading={deleteProjectMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteProjectMutation.mutateAsync({ projectId: id })}
          >
            Delete Project
          </Button>
        }
      />
    // </Authorization>
  );
};
