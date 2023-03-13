import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, Option, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useTask } from '../api/getTask';
import { UpdateTaskDTO, useUpdateTask } from '../api/updateTask';
import { useLabelOptions } from '@/hooks/useLabelOptions';
import { useCallback, useEffect, useState } from 'react';
import { Label } from '@/features/labels';
import { useUserOptions } from '@/hooks/useUserOptions';

type UpdateTaskProps = {
  taskId: string;
};

const schema = z.object({
  search: z.nullable(z.string()),
  labels: z.nullable(
    z.array(
      z.object({ label : z.string(), value : z.number() })
    )
  ),
  assignees: z.nullable(
    z.array(
      z.object({ label : z.string(), value : z.number() })
    )
  )
});

export const UpdateTask = ({ taskId }: UpdateTaskProps) => {
  const taskQuery = useTask({ taskId });
  const labelOptions = useLabelOptions();
  const usersOptions = useUserOptions();
  const updateTaskMutation = useUpdateTask();

  const [ defaultLabels, setDefaultLabels ] = useState<Array<Option>>([]);

  const getDefaultRoleOptions = useCallback(() : Array<Option> => {
    const labels =  taskQuery.data?.labels;
    return labels ? labels.map((label : Label)=> ({
      value : label.id,
      label : label.name
    })) : [];
  }, [taskId, taskQuery.data?.labels])

  useEffect(()=>{
    setDefaultLabels(()=>getDefaultRoleOptions());
  },[ taskId, taskQuery.data?.labels ]);

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateTaskMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm" />
        }
        title="Update Task"
        submitButton={
          <Button
            form="update-task"
            type="submit"
            size="sm"
            isLoading={updateTaskMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdateTaskDTO['data'], typeof schema>
          id="update-task"
          onSubmit={async (values) => {
            await updateTaskMutation.mutateAsync({ data: values, taskId });
          }}
          options={{
            defaultValues: {
              title: taskQuery.data?.title,
              description: taskQuery.data?.description,
              labels: defaultLabels
            },
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
