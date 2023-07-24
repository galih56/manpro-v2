import { Navigate, Route, Routes } from 'react-router-dom';

import { Section } from './Section';
import { Sections } from './Sections';

export const SectionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Sections />} />
      <Route path=":sectionId" element={<Section />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
