import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { SelectTag } from './SelectTag';


const SelectTagStory = () => {
  return (
    <SelectTag/>
  )
}

const meta: Meta = {
  title: 'components/elements/SelectTag',
  component: SelectTagStory,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;


const Template: Story = (props) => <SelectTag/>;

export const Primary = Template.bind({});
Primary.args = {
};
