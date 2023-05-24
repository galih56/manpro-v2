import { Meta, Story } from '@storybook/react';
import { DatePicker, DatePickerPopoverProps } from './DatePicker';
import { Button } from '../Button';
import { useEffect, useState } from 'react';
import { DateRange } from '../DateDisplay';

const meta: Meta = {
  title: 'Components/Elements/DatePicker',
  component: DatePicker,
  parameters: {
    controls: { 
        expanded: true 
    },},
};

export default meta;


export const DatePickerSingle : Story = () => {
    const [ date , setDate ] = useState<Date>(new Date());
    const resetState = () => setDate(new Date());
    
    useEffect(()=>{
        console.log(date)
    },[date])
    
    return (
        <div className="flex flex-col">
            <div>
                <Button onClick={resetState}> Reset State </Button>
            </div>
            <div className='mt-2'>
                <DatePicker 
                    mode='single' 
                    defaultValue={new Date()}
                    value={date}
                    onChange={(value) => setDate(value as Date)}
                />
            </div>
        </div>
    )
}

const initialStateMultiple = [ 
    new Date(2023,5,1), 
    new Date(2023,5,2), 
    new Date(2023,5,3) 
]

export const DatePickerMultiple : Story = () => {
    const [ dates , setDates ] = useState<Date[]>(initialStateMultiple);
    const resetState = () => setDates(initialStateMultiple);
    
    useEffect(()=>{
        console.log(dates)
    },[dates])

    return (
        <div className="flex flex-col">
            <div>
                <Button onClick={resetState}> Reset State </Button>
            </div>

            <div className='mt-2'>
                <DatePicker 
                    mode='multiple' 
                    defaultValue={dates}
                    value={dates}
                    onChange={(value) => setDates(value as Date[])}
                />
            </div>
        </div>
    )
}

const initialStateRange = {
    to : new Date(2023,5,1),
    from : new Date(2023,5,2)
}

export const DatePickerRange : Story = () => {
    const [ dates , setDates ] = useState<DateRange>(initialStateRange);
    const resetState = () => setDates(initialStateRange)

    useEffect(()=>{
        console.log(dates)
    },[dates])

    return (
        <div className="flex flex-col">
            <div>
                <Button onClick={resetState}> Reset State </Button>
            </div>

            <div className='mt-2'>
                <DatePicker 
                    mode='range' 
                    defaultValue={dates}
                    value={dates}
                    onChange={ (value) => setDates(value as DateRange) }
                />
            </div>
        </div>
    )
}
