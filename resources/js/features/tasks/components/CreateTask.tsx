import { PlusIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateTaskDTO, useCreateTask } from '../api/createTask';
import { useLabelOptions } from '@/hooks/useLabelOptions';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  labels: z.nullable(
    z.array(
      z.object({ label : z.string(), value : z.number() })
    )
  )
});

export const CreateTask = () => {
  const labelOptions = useLabelOptions();
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
          onSubmit={async (values) => {
            if(values.labels){
              values.labels = values.labels.map((role : any) => role.value);
            }
            await createTaskMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState, control }) => (
            <>
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
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
