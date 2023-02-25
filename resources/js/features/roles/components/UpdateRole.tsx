import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useRole } from '../api/getRole';
import { UpdateRoleDTO, useUpdateRole } from '../api/updateRole';

type UpdateRoleProps = {
  roleId: string;
};

const schema = z.object({
  name: z.string().min(1, 'Required'),
  code: z.string().min(1, 'Required'),
});

export const UpdateRole = ({ roleId }: UpdateRoleProps) => {
  const roleQuery = useRole({ roleId });
  const updateRoleMutation = useUpdateRole();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateRoleMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Role
          </Button>
        }
        title="Update Role"
        submitButton={
          <Button
            form="update-role"
            type="submit"
            size="sm"
            isLoading={updateRoleMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdateRoleDTO['data'], typeof schema>
          id="update-role"
          onSubmit={async (values) => {
            await updateRoleMutation.mutateAsync({ data: values, roleId });
          }}
          options={{
            defaultValues: {
              name: roleQuery.data?.name,
              code: roleQuery.data?.code,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Name"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <InputField
                label="CODE"
                error={formState.errors['code']}
                registration={register('code')}
                maxLength={8}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
