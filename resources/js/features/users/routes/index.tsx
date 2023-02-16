import { Navigate, Route, Routes } from 'react-router-dom';

import { Profile } from './Profile';
import { Users } from './Users';

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Users />} />
      <Route path="profile" element={<Profile />} />
      <Route path=":userId" element={<Profile />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
