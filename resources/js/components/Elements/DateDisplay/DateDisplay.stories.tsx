import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { DateDisplay, DateDisplayProps } from './DateDisplay';
import { formatDate } from '@/utils/datetime';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Badge } from '../Badge';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Components/Elements/DateDisplay',
  component: DateDisplay,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DateDisplayProps> = (props) => <DateDisplay {...props} />;

export const Single = Template.bind({});
Single.args = {
    mode : 'single',
    data : new Date(),
    placeholder : 'Due Date'
};

export const Multiple = Template.bind({});
Multiple.args = {
    mode : 'multiple',
    data : [ 
        new Date(2023,1,1), 
        new Date(2023,2,1), 
        new Date(2023,3,1) 
    ],
    placeholder : 'Due Date'
};

export const DateRangeSameMonth = Template.bind({});
DateRangeSameMonth.args = {
    mode : 'range',
    data : {
        from : new Date(2023,1, 1),
        to : new Date(2023,1,10)
    },
    placeholder : 'Due Date'
};

export const DateRangeDefault = Template.bind({});
DateRangeDefault.args = {
    mode : 'range',
    data : {
        from : new Date(2023,1, 1),
        to : new Date(2023,2,1)
    },
    placeholder : 'Due Date'
};



type CustomBadgeProps = {
    key: string;
    className? : string;
    children: React.ReactNode;
    onRemove: () => void
}

const CustomBadge = ( { 
    onRemove,
    children
} : CustomBadgeProps )=>{
    return (
        <Badge variant='default' className={"inline-flex mt-2"}>
            {children}
            <XMarkIcon className='h-4 ml-2 hover:fill-red-900 px-0' onClick={() => onRemove()}/>
        </Badge>
    )
}

const initialState =  [ 
    new Date(2023,1,1), 
    new Date(2023,2,1), 
    new Date(2023,3,1) 
]

export const MultipleDateRangeWithCustomComponent: Story = () => {
    const [ dates, setDates ] = React.useState<Date[]>(initialState);
    
    const handleRemoveDate = ( removedDate : Date)=> setDates(dates!.filter((date : Date) => formatDate(date) != formatDate(removedDate)))

    const resetState = ()=> setDates(initialState);

    return (
        <div className="flex flex-col">
            <div className='mt-2'>
                <Button onClick={resetState}>
                    Reset State
                </Button>
            </div>
            <div className='mt-2'>
                <DateDisplay 
                    mode='multiple' 
                    data={dates} 
                    CustomBadge={(date, i) => <CustomBadge key={`${date.toISOString()}-${i}`} onRemove={() => handleRemoveDate(date)}   > {formatDate(date)} </CustomBadge>}
                />
            </div>
        </div>
    )   
}
