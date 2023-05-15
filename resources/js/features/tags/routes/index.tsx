import { Navigate, Route, Routes } from 'react-router-dom';

import { Tags } from './Tag';

export const TagsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Tags />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
