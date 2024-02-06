import * as z from 'zod';

import { Form, FormDrawer, InputField, Option, SelectField, TextAreaField } from '@/components/Form';
import { useTask } from '../api/getTask';
import { UpdateTaskDTO, useUpdateTask } from '../api/updateTask';
import { useTagOptions } from '@/hooks/useTagOptions';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useProjectOptions } from '@/hooks/useProjectOptions';

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

export const FormUpdateTask = ({ taskId }: UpdateTaskProps) => {
  const taskQuery = useTask({ taskId });
  const projectOptions = useProjectOptions();
  const tagOptions = useTagOptions();
  const usersOptions = useUserOptions();
  const updateTaskMutation = useUpdateTask();

  const defaultTags = taskQuery.data?.tags?.map(label => label.id.toString()) ?? undefined;
  const defaultAssignees = taskQuery.data?.assignees?.map(assignee => assignee.id.toString()) ?? undefined;

  return (
    <Form<UpdateTaskDTO['data'], typeof schema>
      id="update-task"
      onSubmit={async (values) => {
        await updateTaskMutation.mutateAsync({ data: values, taskId });
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
        </>
      )}
    </Form>
  );
};
