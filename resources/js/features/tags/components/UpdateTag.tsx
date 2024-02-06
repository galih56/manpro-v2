import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';
import { Button } from "@tremor/react";

import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useTag } from '../api/getTag';
import { UpdatedTagDTO, useUpdatedTag } from '../api/updateTag';

type UpdateTagProps = {
  tagId: string;
};

const schema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export const UpdateTag = ({ tagId }: UpdateTagProps) => {
  const tagQuery = useTag({ tagId });
  const updateTagMutation = useUpdatedTag();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateTagMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm" />
        }
        title="Update Label"
        submitButton={
          <Button
            form="update-tag"
            type="submit"
            size="sm"
            loading={updateTagMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdatedTagDTO['data'], typeof schema>
          id="update-tag"
          onSubmit={async (values) => {
            await updateTagMutation.mutateAsync({ data: values, tagId });
          }}
          options={{
            defaultValues: {
              name: tagQuery.data?.name,
              description: tagQuery.data?.description,
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
