import React, { useState } from "react";
import { Task, ViewMode, Gantt, GanttProps } from "gantt-task-react";
import { getStartEndDateForProject, initTasks } from "./helper";
import "gantt-task-react/dist/index.css";
import { ViewSwitcher } from "./ViewSwitcher";


export type GanttChartProps = { 
    showTaskList? : boolean
} & GanttProps

export const GanttChart = (props : GanttChartProps) => {
  const [view, setView] = useState<ViewMode | undefined>(props.viewMode);
  const [tasks, setTasks] = useState<Task[]>(props.tasks?? []);
  const [isChecked, setIsChecked] = useState(props.tasks ? props.showTaskList : false);
  
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }


  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        {...props}
        tasks={tasks}
        viewMode={view}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        
      />
    </div>
  );
}