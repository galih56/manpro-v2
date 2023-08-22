import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Tabs } from "@/components/Elements/Tab";
import { Board, Gantt } from "./Panels";
import { Task } from "@/features/tasks";
import { Navigate, Route, Routes } from 'react-router-dom';
import { flattenSectionTasks } from "@/features/projects/utils";
import { useTasks } from "@/stores/tasks";
import { Button } from "@/components/elements";

type ProjectDetailType = {
  project : any
}

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

export const ProjectDetail = ({
  project,
} : ProjectDetailType) => {
  const { store : storeTasks} = useTasks();

  useEffect(()=>{
    const tasks = flattenSectionTasks(project.sections).filter(item => (item.startOn && item.dueOn) || (item.startedAt && item.completedAt));
    console.log(tasks);
    storeTasks(tasks);
  },[])


  const navigate = useNavigate();

  const handleOnTabChange = (selectedIndex: number) => {
    const { path } = TabRoutes[selectedIndex];
    navigate(path || "/");
  };


  return (
      <Routes>
        <Route element={<Tabs tabInfo={TabRoutes} onTabChange={handleOnTabChange} additionalProps={project}/>}>
          {TabRoutes.map(({ element, path }) => (
            <Route key={path} {...{ element, path }} />
          ))}
          <Route
            path="*"
            element={<Navigate to={TabRoutes[0].path} replace />}
          />
        </Route>
      </Routes>
  )
}


export default Tabs;