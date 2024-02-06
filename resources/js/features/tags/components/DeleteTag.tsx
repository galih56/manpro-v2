import { TrashIcon } from '@heroicons/react/24/solid';
import { Button } from "@tremor/react";

import { ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteTag } from '../api/deleteTag';

type DeleteTagProps = {
  id: string;
};

export const DeleteTag = ({ id }: DeleteTagProps) => {
  const deleteTagMutation = useDeleteTag();

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
            loading={deleteTagMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteTagMutation.mutateAsync({ tagId: id })}
          >
            Delete Label
          </Button>
        }
      />
    // </Authorization>
  );
};
