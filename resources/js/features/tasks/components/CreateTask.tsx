import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateTaskDTO, useCreateTask } from '../api/createTask';
import { useLabelOptions } from '@/hooks/useLabelOptions';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useProjectOptions } from '@/hooks/useProjectOptions';
import { DatePicker } from '@/components/Form/DatePicker';

const schema = z.object({
  projectId: z.number(),
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  labels: z.nullable(
    z.array(
      z.number()
    )
  ),
  assignees: z.nullable(
    z.array(
      z.number()
    )
  ),
});

export const CreateTask = () => {
  const projectOptions = useProjectOptions();
  const labelOptions = useLabelOptions();
  const usersOptions = useUserOptions();
  const createTaskMutation = useCreateTask();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createTaskMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Task
          </Button>
        }
        title="Create Task"
        submitButton={
          <Button
            form="create-task"
            type="submit"
            size="sm"
            isLoading={createTaskMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateTaskDTO['data'], typeof schema>
          id="create-task"
          onSubmit={async (values) =>  await createTaskMutation.mutateAsync({ data: values })}
          schema={schema}
        >
          {({ register, formState, control }) => (
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
              
              <SelectField
                label='Labels'
                options={labelOptions}
                error={formState.errors['labels']}
                registration={register('labels')}
                control={control}
                multiple={true}
              />
              
              <SelectField
                label='Assignees'
                options={usersOptions}
                error={formState.errors['assignees']}
                registration={register('assignees')}
                control={control}
                multiple={true}
              />
              <DatePicker/>
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
