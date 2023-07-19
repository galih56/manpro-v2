import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Tabs } from "@/components/Elements/Tab";
import { Board, Gantt } from "./Panels";
import { Project } from "../../types";
import TasksProvider from "@/stores/tasks";
import { restructureGanttChartData } from "../../utils";

type ProjectTabsType = {
  project : Project
}

export const ProjectTabs = ({
  project
} : ProjectTabsType) => {
  const TabRoutes = [
    {
      path: "gantt",
      label: "Gantt",
      element: <Gantt/>
    },
    {
      path: "board",
      label: "Board",
      element:  <Board/>
    }
  ];


  const navigate = useNavigate();

  const handleOnTabChange = (selectedIndex: number) => {
    const { path } = TabRoutes[selectedIndex];
    navigate(path || "/");
  };
  const ganttTasks = restructureGanttChartData(project.sections);
  console.log('ganttTasks : ',ganttTasks)
  return (
    <TasksProvider>
      <Tabs tabInfo={TabRoutes} onTabChange={handleOnTabChange} additionalProps={project}/>
    </TasksProvider>
  )
}


export default Tabs;