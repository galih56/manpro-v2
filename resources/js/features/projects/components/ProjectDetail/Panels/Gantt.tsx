import { GanttChart } from "@/components/GanttChart"
import { NoEntriesFound } from "@/components/Layout";
import { UpdateTask } from "@/features/tasks/components/UpdateTask";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useTasks, withTasks } from "@/stores/tasks";
import { convertDates } from "@/utils/datetime";
import { isValid, parseISO } from "date-fns";
import { Task } from "gantt-task-react";
import { cloneElement, useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Drawer, DrawerProps } from '@/components/Elements/Drawer';
import { Button } from '@/components/Elements/Button';
import { FormUpdateTask } from "@/features/tasks/components/FormUpdateTask";
import { useTask } from "@/features/tasks/api/getTask";
import { useProjectOptions } from "@/hooks/useProjectOptions";
import { useTagOptions } from "@/hooks/useTagOptions";
import { useUserOptions } from "@/hooks/useUserOptions";
import { UpdateTaskDTO, useUpdateTask } from "@/features/tasks/api/updateTask";
import { Form, InputField, SelectField, TextAreaField } from "@/components/Form";
import * as z from 'zod';
import { DatePicker } from "@/components/Elements/DatePicker";
import { Spinner } from "@/components/elements";

export const Gantt = withTasks((props) => {
    const { close, open, isOpen } = useDisclosure(false);
    
    const [clickedTask, setClickedTask] = useState<Task | null>(null);

    const { tasks } = useTasks();
    
    useEffect(()=>{
        console.log(tasks)
    },[isOpen]);
    
    if(!tasks.length){
        return (
            <NoEntriesFound/>
        )
    }

    const onClick = (task : Task) => {
        setClickedTask(task);
        open();
    }

    return (
        <>
            <GanttChart  
                tasks={tasks} 
                onClick={onClick}

            />
            {clickedTask && <UpdateTaskDrawer open={isOpen} taskId={clickedTask!.id} onClose={close} />}
        </>
    )
})


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

type FormDrawerProps = {
    taskId: string;
    open: boolean;
    size?: DrawerProps['size'];
    onClose: ()=>void;
  };

const UpdateTaskDrawer = ({
    taskId,
    open,
    size = 'md',
    onClose
  }: FormDrawerProps) => {
    const taskQuery = useTask({ taskId });
    const projectOptions = useProjectOptions();
    const tagOptions = useTagOptions();
    const usersOptions = useUserOptions();
    const updateTaskMutation = useUpdateTask();
  
    const defaultTags = taskQuery.data?.tags.map(label => label.id.toString());
    const defaultAssignees = taskQuery.data?.assignees.map(assignee => assignee.id.toString());

    return (
      <>
        <Drawer
          isOpen={open}
          onClose={onClose}
          title={"Update Task"}
          size={size}
          renderFooter={() => (
            <>
                <Button variant="inverse" size="sm" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    form="update-task"
                    type="submit"
                    size="sm"
                    isLoading={updateTaskMutation.isLoading}
                >
                    Submit
                </Button>
            </>
          )}
        >
            {
                taskQuery.data ? (
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
                        {({ register, formState, control }) => {
                            return (
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
                                defaultValue={taskQuery.data.startOn}
                            />
                            <DatePicker 
                                label='Due On' 
                                mode='single' 
                                name="dueOn" 
                                control={control} error={formState.errors['dueOn']}
                                defaultValue={taskQuery.data.dueOn}
                            />
                            <DatePicker 
                                label='Started At'  
                                mode='single' 
                                name="startedAt" 
                                control={control} error={formState.errors['startedAt']}
                                defaultValue={taskQuery.data.startedAt}
                            />
                            <DatePicker 
                                label='Completed At' 
                                mode='single' 
                                name="completedAt" 
                                control={control} error={formState.errors['completedAt']}
                                defaultValue={taskQuery.data.completedAt}
                            />
                            </>
                        )}}
                    </Form>
                ) : (
                    <div className="w-full h-48 flex justify-center items-center">
                        <Spinner size="lg" />
                    </div>
                )
            }
        </Drawer>
      </>
    );
  };
  