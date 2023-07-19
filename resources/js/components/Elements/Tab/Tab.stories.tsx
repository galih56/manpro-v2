import { Meta, Story } from '@storybook/react';

import { Tabs, TabProps } from './Tabs';
import { TabsData } from './TabRoutes';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const meta: Meta = {
  title: 'components/elements/Tab',
  component: Tabs,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const TabsImplementation = () => {
  const navigate = useNavigate();

  const handleOnTabChange = (selectedIndex: number) => {
    const { path } = TabsData[selectedIndex];

    navigate(path || "/");
  };

  return (
    <Tabs tabInfo={TabsData} onTabChange={handleOnTabChange}/>
  )
}

const Template: Story<TabProps> = (props :any) => {
  return (
    <div className="App">
      <Routes>
        <Route element={<TabsImplementation />}>
          {TabsData.map(({ element, path }) => (
            <Route key={path} {...{ element, path }} />
          ))}
          <Route
            path="*"
            element={<Navigate to={TabsData[0].path} replace />}
          />
        </Route>
      </Routes>
    </div>
  )
};

export const DefaultDateFeld = Template.bind({});
DefaultDateFeld.args = {
  tabInfo : TabsData
};