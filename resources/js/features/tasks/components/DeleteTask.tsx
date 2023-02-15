import { TrashIcon } from '@heroicons/react/24/solid';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteTask } from '../api/deleteTask';

type DeleteTaskProps = {
  id: string;
};

export const DeleteTask = ({ id }: DeleteTaskProps) => {
  const deleteTaskMutation = useDeleteTask();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Task"
        body="Are you sure you want to delete this task?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Task
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteTaskMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteTaskMutation.mutateAsync({ taskId: id })}
          >
            Delete Task
          </Button>
        }
      />
    // </Authorization>
  );
};
