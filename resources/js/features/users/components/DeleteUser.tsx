import { ConfirmationDialog } from '@/components/Elements';
import { useDeleteUser } from '../api/deleteUser';
import { useAuth } from '@/lib/authentication';
import { Button } from "@tremor/react";

type DeleteUserProps = {
  id: string;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const { auth } = useAuth();
  const deleteUserMutation = useDeleteUser();

  if (auth?.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Are you sure you want to delete this user?"
      triggerButton={<Button variant="danger">Delete</Button>}
      confirmButton={
        <Button
          loading={deleteUserMutation.isLoading}
          type="button"
          className="bg-red-600"
          onClick={() => deleteUserMutation.mutate({ userId: id })}
        >
          Delete User
        </Button>
      }
    />
  );
};
