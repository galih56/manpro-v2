import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateTaskDTO, useCreateTask } from '../api/createTask';
import { useTagOptions } from '@/hooks/useTagOptions';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useProjectOptions } from '@/hooks/useProjectOptions';
import { DatePicker } from '@/components/Form/DatePicker';

const schema = z.object({
  projectId: z.string(),
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  tags: z.array( z.string() ).nullish(),
  assignees: z.array(z.string()).nullish(),
  startOn: z.string().datetime().nullish(),
  startedAt: z.string().datetime().nullish(),
  dueOn: z.string().datetime().nullish(),
  completedAt: z.string().datetime().nullish(),
  userId: z.number().nullish()
});

export const CreateTask = () => {
  const projectOptions = useProjectOptions();
  const tagOptions = useTagOptions();
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
              <DatePicker 
                label='Start On'  mode='single' name="startOn" 
                control={control} error={formState.errors['startOn']}
              />
              <DatePicker 
                label='Due On' mode='single' name="dueOn" 
                control={control} error={formState.errors['dueOn']}
              />
              <DatePicker 
                label='Started At'  mode='single' name="startedAt" 
                control={control} error={formState.errors['startedAt']}
              />
              <DatePicker 
                label='Completed At' mode='single' name="completedAt" 
                control={control} error={formState.errors['completedAt']}
              />
              <TextAreaField
                label="Description"
                error={formState.errors['description']}
                registration={register('description')}
              />
              
              <SelectField
                label='Tags'
                options={tagOptions}
                error={formState.errors['tags']}
                registration={register('tags')}
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
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};