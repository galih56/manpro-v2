import { Meta, Story } from '@storybook/react';
import { Button } from '../Elements';
import { Form } from './Form';
import { FormDrawer } from './FormDrawer';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextareaField';
import { DatePicker, DateRange } from '../Elements/DatePicker/DatePicker';
import { FieldWrapper } from './FieldWrapper';
import * as z from 'zod';
import { DatePicker as AntDatePicker, Space } from 'antd';

const { RangePicker } = AntDatePicker;


type FormValues = {
  title: string;
  description: string;
  type: string;
  singleDatePicker: string;
  multiDatePicker: Date[];
  rangeDatePicker: DateRange;
  start? : Date | undefined;
  end? : Date | undefined;
  content: string;
};

const schema = z.object({
  projectId: z.string(),
  title: z.string().min(1,'Required'),
  description: z.nullable(z.string()),
  type: z.string(),
  start: z.date(),
  end: z.date(),
});

const MyForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  const rangeDatePickerDefault = {
    from : new Date(2023,1,2), 
    to : undefined
  };


  return (
    <Form<FormValues, typeof schema>
      options={{
        defaultValues: {
          title: "My Task",
          description: "Lorem Ipsum",
          rangeDatePicker: rangeDatePickerDefault,
          start: rangeDatePickerDefault.from,
          end: rangeDatePickerDefault.to,
        },
      }}
      onSubmit={async (values) => {
        console.log(values)
      }}
      id="my-form"
      schema={schema}
    >
      {({ register, formState, control }) => (
        <>
          <InputField
            label="Text"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <TextAreaField
            label="Long Text"
            error={formState.errors['description']}
            registration={register('description')}
          />
          <SelectField
            label="Basic Select"
            error={formState.errors['type']}
            registration={register('type')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
          />
          <SelectField
            label="Creatable Select"
            error={formState.errors['type']}
            registration={register('type')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
            creatable={true}
          />
          <SelectField
            label="Creatable Multi Select"
            error={formState.errors['type']}
            registration={register('type')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
            creatable={true}
            multiple={true}
          />
          <DatePicker 
              label='Single Date Picker'  mode='single' name="singleDatePicker" 
              control={control} error={formState.errors['singleDatePicker']}
            />
            <DatePicker 
              label='Multiple Date Picker' mode='multiple' name="multiDatePicker" 
              control={control} error={formState.errors['multiDatePicker']}
            />
            <DatePicker 
              label='Range Date Picker' mode='range' name={['start','end']}
              defaultValue={{
                from : new Date(2023,1,2), 
                to : undefined
              }}
              error={formState.errors['start'] || formState.errors['end']}
            />
            <Space direction="vertical" size={12}>
              <RangePicker />
              <RangePicker showTime />
              <RangePicker picker="week" />
              <RangePicker picker="month" />
              <RangePicker picker="quarter" />
              <RangePicker picker="year" />
            </Space>
          {!hideSubmit && (
            <div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          )}
        </>
      )}
    </Form>
  );
};

const meta: Meta = {
  title: 'Components/Form',
  component: MyForm,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = () => <MyForm />;

export const Default = Template.bind({});
Default.args = {};

export const AsFormDrawer = () => {
  return (
    <FormDrawer
      triggerButton={<Button>Open Form</Button>}
      isDone={true}
      title="My Form"
      size="lg"
      submitButton={
        <Button form="my-form" type="submit">
          Submit
        </Button>
      }
    >
      <MyForm hideSubmit />
    </FormDrawer>
  );
};