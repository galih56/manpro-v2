import { Navigate, Route, Routes } from 'react-router-dom';

import { Task } from './Task';
import { Tasks } from './Tasks';

export const TasksRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Tasks />} />
      <Route path=":taskId" element={<Task />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
