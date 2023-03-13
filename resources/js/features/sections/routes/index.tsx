import { Navigate, Route, Routes } from 'react-router-dom';

import { Role } from './Role';
import { Roles } from './Roles';

export const RolesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Roles />} />
      <Route path=":roleId" element={<Role />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
