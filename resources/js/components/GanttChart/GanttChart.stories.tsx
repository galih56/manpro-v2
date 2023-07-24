import { Meta, Story } from '@storybook/react';
import { GanttChart } from './GanttChart';
import { getStartEndDateForProject, initTasks } from './helper';
import { useState } from 'react';
import { Task, ViewMode } from 'gantt-task-react';

const meta: Meta = {
    title: 'Components/GanttChart',
    component: GanttChart,
    parameters: {
        controls: { 
            expanded: true 
        }
    },
};

export default meta;



export const DefaultGanttChart : Story = () => {
    const [view, setView] = useState<ViewMode>(ViewMode.Day);
    const [tasks, setTasks] = useState<Task[]>(initTasks());

    const handleTaskChange = (task: Task) => {
      console.log("On date change Id:" + task.id);
      let newTasks = tasks.map(t => (t.id === task.id ? task : t));
      if (task.project) {
        const [start, end] = getStartEndDateForProject(newTasks, task.project);
        const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
        if (
          project.start.getTime() !== start.getTime() ||
          project.end.getTime() !== end.getTime()
        ) {
          const changedProject = { ...project, start, end };
          newTasks = newTasks.map(t =>
            t.id === task.project ? changedProject : t
          );
        }
      }
      setTasks(newTasks);
    };
  
    const handleTaskDelete = (task: Task) => {
      const conf = window.confirm("Are you sure about to delete " + task.name + " ?");
      if (conf) {
        setTasks(tasks.filter(t => t.id !== task.id));
      }
      return conf;
    };
  
    const handleProgressChange = async (task: Task) => {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      console.log("On progress change Id:" + task.id);
    };
  
    const handleDblClick = (task: Task) => {
      alert("On Double Click event Id:" + task.id);
    };
  
    const handleClick = (task: Task) => {
      console.log("On Click event Id:" + task.id);
    };
  
    const handleSelect = (task: Task, isSelected: boolean) => {
      console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };
  
    const handleExpanderClick = (task: Task) => {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      console.log("On expander click Id:" + task.id);
    };
    return (
        <div className="flex flex-col">
            <div className='mt-2'>
                <GanttChart
                    tasks={tasks}
                    viewMode={view}
                    onDateChange={handleTaskChange}
                    onDelete={handleTaskDelete}
                    onProgressChange={handleProgressChange}
                    onDoubleClick={handleDblClick}
                    onClick={handleClick}
                    onSelect={handleSelect}
                    onExpanderClick={handleExpanderClick}
                    showTaskList={true}
                />
            </div>
        </div>
    )
}

