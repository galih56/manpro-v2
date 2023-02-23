import { TrashIcon } from '@heroicons/react/24/solid';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteRole } from '../api/deleteRole';

type DeleteRoleProps = {
  id: string;
};

export const DeleteRole = ({ id }: DeleteRoleProps) => {
  const deleteRoleMutation = useDeleteRole();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Role"
        body="Are you sure you want to delete this task?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Role
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteRoleMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteRoleMutation.mutateAsync({ roleId: id })}
          >
            Delete Role
          </Button>
        }
      />
    // </Authorization>
  );
};
