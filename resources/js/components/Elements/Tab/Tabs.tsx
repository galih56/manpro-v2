import React from "react";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

export interface TabData {
  path: string;
  label: string;
  element: React.ReactElement;
}

export interface TabProps {
  tabInfo: TabData[];
  additionalProps : any;
  onTabChange: (selectedIndex: number) => void;
}

export function Tabs({ tabInfo, onTabChange, additionalProps }: TabProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="mt-1 text-sm text-gray-500">
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(selectedTabIndex: number) => {
          setSelectedIndex(selectedTabIndex);
          onTabChange(selectedTabIndex);
        }}
      >
        <Tab.List className={"my-2 flex text-sm font-medium"}>
          {tabInfo.map((item) => (
            <Tab key={item.path} aria-label={item.label} name={item.label}  
              className={({ selected }) => clsx("-mb-px py-2 px-4", selected && 'text-cyan-500')}>
              {item.label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {tabInfo.map((item) => (
            <Tab.Panel key={item.path} className="bg-white p-4">
              <Outlet context={additionalProps} />  {/* <-- Outlet is tab panel content, route fills in */}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Tabs;