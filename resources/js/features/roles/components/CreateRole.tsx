import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateRoleDTO, useCreateRole } from '../api/createRole';

const schema = z.object({
  name: z.string(),
  code: z.string().min(1, 'Required'),
});

export const CreateRole = () => {
  const createRoleMutation = useCreateRole();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createRoleMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Role
          </Button>
        }
        title="Create Role"
        submitButton={
          <Button
            form="create-role"
            type="submit"
            size="sm"
            isLoading={createRoleMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateRoleDTO['data'], typeof schema>
          id="create-role"
          onSubmit={async (values) =>  await createRoleMutation.mutateAsync({ data: values })}
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
                label="Code"
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
