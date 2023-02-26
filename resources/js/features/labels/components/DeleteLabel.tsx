import { TrashIcon } from '@heroicons/react/24/solid';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteLabel } from '../api/deleteLabel';

type DeleteLabelProps = {
  id: string;
};

export const DeleteLabel = ({ id }: DeleteLabelProps) => {
  const deleteLabelMutation = useDeleteLabel();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Label"
        body="Are you sure you want to delete this label?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Label
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteLabelMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteLabelMutation.mutateAsync({ labelId: id })}
          >
            Delete Label
          </Button>
        }
      />
    // </Authorization>
  );
};
