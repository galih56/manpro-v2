import * as z from 'zod';
import { Form,  InputField,  SelectField, TextAreaField } from '@/components/Form';
import { useTask } from '../api/getTask';
import { UpdateTaskDTO, useUpdateTask } from '../api/updateTask';
import { useTagOptions } from '@/hooks/useTagOptions';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useProjectOptions } from '@/hooks/useProjectOptions';
import { DatePicker } from '@/components/Elements/DatePicker';
import { UseBaseMutationResult } from '@tanstack/react-query';


type UpdateTaskProps = {
  taskId: string;
  /*
    Only receive UseMutationResult
  */
  onSubmit?: (values : any) => void;
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

export const FormUpdateTask = ({ taskId, onSubmit }: UpdateTaskProps) => {
  const taskQuery = useTask({ taskId });
  const task = taskQuery.data;

  const projectOptions = useProjectOptions();
  const tagOptions = useTagOptions();
  const usersOptions = useUserOptions();

  const defaultTags = task?.tags?.map(label => label.id.toString()) ?? undefined;
  const defaultAssignees = task?.assignees?.map(assignee => assignee.id.toString()) ?? undefined;
 
  const defaultEstimation = {
    from : task?.startOn?? undefined, 
    to : task?.dueOn?? undefined
  }
  const defaultRealisation = {
    from : task?.startedAt?? undefined, 
    to : task?.completedAt?? undefined
  }
  console.log(defaultEstimation);
  return (
    <Form<UpdateTaskDTO['data'], typeof schema>
      id="update-task"
      onSubmit={(values) => {
        if(onSubmit) onSubmit(values);
      }}
      options={{
        defaultValues: {
          title: task?.title,
          description: task?.description,
          tags: defaultTags,
          assignees: defaultAssignees,
          projectId: task?.project?.id.toString(),
          startOn: task?.startOn,
          dueOn: task?.dueOn,
          startedAt: task?.startedAt,
          completedAt: task?.completedAt,
        },
      }}
      schema={schema}
    >
      {({ register, formState, control }) => (
        <>
          <SelectField
            label='Project'
            options={projectOptions}
            defaultValue={task?.project?.id.toString()}
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
            label='Deadline Estimation'  
            mode='range' 
            name={["startOn", "dueOn"]} 
            defaultValue={defaultEstimation}
            control={control} error={formState.errors['startOn']}
          />
          <DatePicker 
            label='Realisation'  
            mode='range' 
            name={["startedAt","completedAt"]} 
            defaultValue={defaultRealisation}
            control={control}/>
        </>
      )}
    </Form>
  );
};
