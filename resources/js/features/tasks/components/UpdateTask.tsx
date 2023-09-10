import { PencilIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, Option, SelectField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useTask } from '../api/getTask';
import { UpdateTaskDTO, useUpdateTask } from '../api/updateTask';
import { useTagOptions } from '@/hooks/useTagOptions';
import { useCallback, useEffect, useState } from 'react';
import { Tag } from '@/features/tags';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useProjectOptions } from '@/hooks/useProjectOptions';
import { DatePicker } from '@/components/Elements/DatePicker';

type UpdateTaskProps = {
  taskId: string;
};

const schema = z.object({
  projectId: z.string(),
  title: z.string().min(1,'Required'),
  description: z.nullable(z.string()),
  tags: z.array(z.string()).nullish(),
  assignees: z.array(z.string()).nullish(),
  startOn: z.date().optional().nullish(),
  dueOn: z.date().optional().nullish(),
  startedAt: z.date().optional().nullish(),
  completedAt: z.date().optional().nullish(),
});

export const UpdateTask = ({ taskId }: UpdateTaskProps) => {
  const taskQuery = useTask({ taskId });
  const projectOptions = useProjectOptions();
  const tagOptions = useTagOptions();
  const usersOptions = useUserOptions();
  const updateTaskMutation = useUpdateTask();

  const defaultTags = taskQuery.data?.tags.map(label => label.id.toString());
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
            console.log(values)
            // await updateTaskMutation.mutateAsync({ data: values, taskId });
          }}
          options={{
            defaultValues: {
              title: taskQuery.data?.title,
              description: taskQuery.data?.description,
              tags: defaultTags,
              assignees: defaultAssignees,
              projectId: taskQuery.data?.project?.id.toString() 
            },
          }}
          schema={schema}
        >
          {({ register, formState, control }) => (
            <>
              <SelectField
                label='Project'
                options={projectOptions}
                defaultValue={taskQuery.data?.project?.id.toString()}
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
                label='Tags'
                options={tagOptions}
                defaultValue={defaultTags}
                error={formState.errors['tags']}
                registration={register('tags')}
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
              <DatePicker 
                label='Start On'  
                mode='single' 
                name="startOn" 
                control={control} error={formState.errors['startOn']}
              />
              <DatePicker 
                label='Due On' 
                mode='single' 
                name="dueOn" 
                control={control} error={formState.errors['dueOn']}
              />
              <DatePicker 
                label='Started At'  
                mode='single' 
                name="startedAt" 
                control={control} error={formState.errors['startedAt']}
              />
              <DatePicker 
                label='Completed At' 
                mode='single' 
                name="completedAt" 
                control={control} error={formState.errors['completedAt']}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    // </Authorization>
  );
};
