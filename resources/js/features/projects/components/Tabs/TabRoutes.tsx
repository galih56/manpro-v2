import { Board, Gantt } from "./Panels";

export const TabRoutes = [
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