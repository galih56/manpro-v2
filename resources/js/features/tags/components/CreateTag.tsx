import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';
import { Button } from "@tremor/react";

import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateTagDTO, useCreateTag } from '../api/createTag';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export const CreateTag = () => {
  const createTagMutation = useCreateTag();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createTagMutation.isSuccess}
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
            loading={createTagMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateTagDTO['data'], typeof schema>
          id="create-label"
          onSubmit={async (values) => {
            await createTagMutation.mutateAsync({ data: values });
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
