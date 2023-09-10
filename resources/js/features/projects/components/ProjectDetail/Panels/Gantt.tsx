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
import {  useUpdateTask } from "@/features/tasks/api/updateTask";
import * as z from 'zod';
import { DatePicker } from "@/components/Elements/DatePicker";
import { Spinner } from "@/components/elements";

const retructureTasks = (data : any[]) => {
    var tasks : Array<any> = [];
    data.forEach((task : any) => {
        for (const key in task) {
            const date = parseISO(task[key]);
                        
            if (isValid(date)) {
                task[key] = date;
            } 
            

            if(key == "startOn" ){
                if(task[key]) task.start = task[key];
            }

            if(key == "dueOn"){
                if(task[key]) task.end = task[key];
            }


            if(key == "taskId"){
                if(task[key]) task.dependencies = [ task[key] ];
            }
            if(key == "title" && task[key]){
                if(task[key]) task.name = task[key];
            }
        }
        tasks.push(task)
    }); 
    return tasks;
}

export const Gantt = withTasks((props) => {
    const { close, open, isOpen } = useDisclosure(false);
    
    const [clickedTask, setClickedTask] = useState<Task | null>(null);

    const { tasks } = useTasks();
    
    if(!tasks.length){
        return (
            <NoEntriesFound/>
        )
    }
    
    const onClick = (task : Task) => {
        setClickedTask(task);
        open();
    }
    const timeline = retructureTasks(tasks)
    return (
        <>
            <GanttChart  
                tasks={timeline} 
                onClick={onClick}

            />
            {clickedTask && <UpdateTaskDrawer open={isOpen} taskId={clickedTask!.id} onClose={close} />}
        </>
    )
})


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
    const updateTaskMutation = useUpdateTask();

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
                    <FormUpdateTask onSubmit={async (values) => await updateTaskMutation.mutateAsync({ data: values, taskId })} taskId={taskQuery.data.id}/>
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
  