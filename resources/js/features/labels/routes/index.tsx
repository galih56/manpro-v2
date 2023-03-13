import { Navigate, Route, Routes } from 'react-router-dom';

import { Labels } from './Label';

export const LabelsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Labels />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
