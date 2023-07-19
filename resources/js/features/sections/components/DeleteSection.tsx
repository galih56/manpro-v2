import { TrashIcon } from '@heroicons/react/24/solid';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteSection } from '../api/deleteSection';

type DeleteSectionProps = {
  id: string;
};

export const DeleteSection = ({ id }: DeleteSectionProps) => {
  const deleteSectionMutation = useDeleteSection();

  return (
    // <Authorization allowedSections={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Section"
        body="Are you sure you want to delete this task?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />} />
        }
        confirmButton={
          <Button
            isLoading={deleteSectionMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteSectionMutation.mutateAsync({ roleId: id })}
          >
            Delete Section
          </Button>
        }
      />
    // </Authorization>
  );
};
