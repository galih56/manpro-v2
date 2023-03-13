import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateProjectDTO, useCreateProject } from '../api/createProject';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export const CreateProject = () => {
  const createProjectMutation = useCreateProject();

  return (
    // <Authorization allowedProjects={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createProjectMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Project
          </Button>
        }
        title="Create Project"
        submitButton={
          <Button
            form="create-project"
            type="submit"
            size="sm"
            isLoading={createProjectMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateProjectDTO['data'], typeof schema>
          id="create-project"
          onSubmit={async (values) =>  await createProjectMutation.mutateAsync({ data: values })}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />
               <InputField
                label="Description"
                error={formState.errors['description']}
                registration={register('description')}
                maxLength={8}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
