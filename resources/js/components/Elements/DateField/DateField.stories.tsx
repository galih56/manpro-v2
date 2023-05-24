import { Meta, Story } from '@storybook/react';

import { DateField, DateFieldProps } from './DateField';

const meta: Meta = {
  title: 'components/elements/DateField',
  component: DateField,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DateFieldProps> = (props :any) => <DateField {...props} />;

export const DefaultDateFeld = Template.bind({});
DefaultDateFeld.args = {
};