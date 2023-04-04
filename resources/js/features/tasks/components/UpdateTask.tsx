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
import { useProjectOptions } from '@/hooks/useProjectOptions';

type UpdateTaskProps = {
  taskId: string;
};

const schema = z.object({
  title: z.string().min(1,'Required'),
  description: z.nullable(z.string()),
  labels: z.nullable(
    z.array(
      z.string()
    )
  ),
  assignees: z.nullable(
    z.array(
      z.string()
    )
  )
});

export const UpdateTask = ({ taskId }: UpdateTaskProps) => {
  const taskQuery = useTask({ taskId });
  const projectOptions = useProjectOptions();
  const labelOptions = useLabelOptions();
  const usersOptions = useUserOptions();
  const updateTaskMutation = useUpdateTask();

  const defaultLabels = taskQuery.data?.labels.map(label => label.id.toString());
  const defaultAssignees = taskQuery.data?.assignees.map(assignee => assignee.id.toString());

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
              labels: defaultLabels,
              assignees: defaultAssignees,
              projectId: taskQuery.data?.project?.id 
            },
          }}
          schema={schema}
        >
          {({ register, formState, control }) => (
            <>
              <SelectField
                label='Project'
                options={projectOptions}
                defaultValue={taskQuery.data?.project?.id}
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
                defaultValue={defaultLabels}
                error={formState.errors['labels']}
                registration={register('labels')}
                control={control}
                multiple={true}
              />
              
              <SelectField
                label='Assignees'
                options={usersOptions}
                defaultValue={defaultAssignees}
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
