import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateSectionDTO, useCreateSection } from '../api/createSection';
import { useProjectOptions } from '@/hooks/useProjectOptions';

const schema = z.object({
  projectId: z.string(),
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export const CreateSection = () => {
  const projectOptions = useProjectOptions();
  const createSectionMutation = useCreateSection();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createSectionMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Section
          </Button>
        }
        title="Create Section"
        submitButton={
          <Button
            form="create-section"
            type="submit"
            size="sm"
            isLoading={createSectionMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateSectionDTO['data'], typeof schema>
          id="create-section"
          onSubmit={async (values) =>  await createSectionMutation.mutateAsync({ data: values })}
          schema={schema}
        >
          {({ register, formState, control, getValues }) => {
            return(
            <>
              <SelectField
                label='Project'
                options={projectOptions}
                error={formState.errors['projectId']}
                registration={register('projectId')}
                control={control}
              />
              <InputField
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />
              <TextAreaField
                label="Description"
                error={formState.errors['description']}
                registration={register('description')}
              />
            </>
          )}}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
