import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateLabelDTO, useCreateLabel } from '../api/createLabel';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export const CreateLabel = () => {
  const createLabelMutation = useCreateLabel();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createLabelMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Label
          </Button>
        }
        title="Create Label"
        submitButton={
          <Button
            form="create-label"
            type="submit"
            size="sm"
            isLoading={createLabelMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateLabelDTO['data'], typeof schema>
          id="create-label"
          onSubmit={async (values) => {
            await createLabelMutation.mutateAsync({ data: values });
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

              <TextAreaField
                label="Description"
                error={formState.errors['description']}
                registration={register('description')}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
