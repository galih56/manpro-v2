import { DatePicker } from "antd"
import { useController, Control, FieldError } from "react-hook-form"
import { FieldWrapper } from "./FieldWrapper"
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const CustomDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);
const { RangePicker } = CustomDatePicker;
interface DatePickerFieldProps {
    name? : string,
    control? : Control<any>,
    defaultValue? : [ Date | undefined | null, Date | undefined | null] | Date,
    placeholder? : string | [string,string],
    picker? : "date" | "month" | "year" | "time",
    showTime : object | boolean,
    error : FieldError,
    rangePicker : boolean,
    placement : "bottomLeft" | "bottomRight" | "topLeft" | "topRight",
    renderExtraFooter : (mode : any) => React.ReactNode
}

export const DatePickerField = ({ 
    name, 
    control,
    error, 
    defaultValue, 
    picker, 
    showTime,
    rangePicker,
    placeholder,
    renderExtraFooter
} : DatePickerFieldProps) => {
    if(name && control){
        if(rangePicker){
            const rangePlaceholder : [string,string] = placeholder?placeholder as  [string,string]: ["",""]; 
            const startDefultValue = defaultValue? defaultValue[0] : null;
            const endDefaultValue = defaultValue? defaultValue[1] : null;
            const { field : startField, fieldState : startFieldState} = useController({
                name : name[0],
                control : control,
                defaultValue : startDefultValue
            })
            
            const { field : endField, fieldState : endFieldState} = useController({
                name : name[1],
                control : control,
                defaultValue : endDefaultValue
            })
            return (
                <FieldWrapper error={error}>
                    <RangePicker
                        placeholder={rangePlaceholder}
                        picker={picker}
                        // showTime={showTime}
                        renderExtraFooter={renderExtraFooter}
                    />
                </FieldWrapper>
            )
        }else{
            const { field, fieldState} = useController({
                name : name,
                control : control,
                defaultValue : defaultValue
            })
            return (
                <FieldWrapper error={error}>
                    <CustomDatePicker
                        placeholder={placeholder as string}
                        picker={picker}
                        showTime={showTime}
                        renderExtraFooter={renderExtraFooter}
                    />
                </FieldWrapper>
            )
        }
    }
    return (
        
        <FieldWrapper error={error}>
            <CustomDatePicker
                placeholder={placeholder as string}
                showTime={showTime}
                picker={picker}
                renderExtraFooter={renderExtraFooter}
            />
        </FieldWrapper>
    );
}