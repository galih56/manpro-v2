import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useLabel } from '../api/getLabel';
import { UpdateLabelDTO, useUpdateLabel } from '../api/updateLabel';

type UpdateLabelProps = {
  labelId: string;
};

const schema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export const UpdateLabel = ({ labelId }: UpdateLabelProps) => {
  const labelQuery = useLabel({ labelId });
  const updateLabelMutation = useUpdateLabel();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateLabelMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Label
          </Button>
        }
        title="Update Label"
        submitButton={
          <Button
            form="update-label"
            type="submit"
            size="sm"
            isLoading={updateLabelMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdateLabelDTO['data'], typeof schema>
          id="update-label"
          onSubmit={async (values) => {
            await updateLabelMutation.mutateAsync({ data: values, labelId });
          }}
          options={{
            defaultValues: {
              name: labelQuery.data?.name,
              description: labelQuery.data?.description,
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
