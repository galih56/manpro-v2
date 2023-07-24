import React from 'react';
import { AppProvider } from '../resources/js/stores/providers';
import '../resources/css/app.css'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <AppProvider>
      <Story />
    </AppProvider>
  ),
];