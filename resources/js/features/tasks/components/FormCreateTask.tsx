import { Form, FormDrawer, InputField, SelectField, TextAreaField } from '@/components/Form';
import { CreateTaskDTO, useCreateTask } from '../api/createTask';
import { useTagOptions } from '@/hooks/useTagOptions';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useProjectOptions } from '@/hooks/useProjectOptions';

import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
import * as z from 'zod';
import { Controller } from 'react-hook-form';

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
export const FormCreateTask = () => {
    const projectOptions = useProjectOptions();
    const tagOptions = useTagOptions();
    const usersOptions = useUserOptions();
    const createTaskMutation = useCreateTask();
    return(
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
                <Controller
                    render={(props) => (
                        <RangePicker
                            picker="month"
                            placeholder={["Start On", "Due On"]}
                            {...props}
                            onChange={(e) => {
                                props.field.onChange(e);
                            }}
                        />
                    )}
                    control={control}
                    name={["startOn","dueOn"]}
                    defaultValue=""
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
    )
}