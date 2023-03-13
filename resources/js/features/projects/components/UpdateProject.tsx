import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useProject } from '../api/getProject';
import { UpdateProjectDTO, useUpdateProject } from '../api/updateProject';

type UpdateProjectProps = {
  projectId: string;
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export const UpdateProject = ({ projectId }: UpdateProjectProps) => {
  const projectQuery = useProject({ projectId });
  const updateProjectMutation = useUpdateProject();

  return (
    // <Authorization allowedProjects={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateProjectMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm" />
        }
        title="Update Project"
        submitButton={
          <Button
            form="update-project"
            type="submit"
            size="sm"
            isLoading={updateProjectMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdateProjectDTO['data'], typeof schema>
          id="update-project"
          onSubmit={async (values) => {
            await updateProjectMutation.mutateAsync({ data: values, projectId });
          }}
          options={{
            defaultValues: {
              title: projectQuery.data?.title,
              description: projectQuery.data?.description,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Name"
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
