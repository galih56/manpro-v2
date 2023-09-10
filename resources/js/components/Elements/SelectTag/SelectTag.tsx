import { Option, SelectField } from "@/components/Form"
import { useEffect, useState } from "react"
import { Tag } from "../../../features/tags/types";
import { useTags } from "../../../features/tags/api/getTags";
import { usePopper } from "react-popper";
import { Popover as UIPopover, Transition } from '@headlessui/react'
import { InputField } from "@/components/Form";
import Creatable, {useCreatable} from 'react-select/creatable';

/*
    Flow creatable tag
    use props onCreatOption
    send post request after creating new tag using onCreateOption
    get the newest tag id
    append the new tag into options
    if the post request failed, show alert

*/

export const SelectTag = () => {
    const [ newTag, setNewTag ] = useState<string>("");
    const [ options, setOptions ] = useState<Option[]>([]);
    const { data, refetch } = useTags();
    const creatable = useCreatable();
    creatable.

    useEffect(()=>{
        if(data){
            const newOptions = data.map(item => ({
                value : item.id.toString(),
                label : item.name
            }));
            setOptions(newOptions);
        }
    }, [ data ])

    return (
        <>
            <Creatable 
                openMenuOnClick
            />
        
            <SelectField
                options={options}
            />
        </>
    )
}

const Popover = () => {
    let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
    let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement : 'auto'
    });

    return (
        <UIPopover>
        {({ open }) => (
          <>
            <div className={"inline-flex align-middle"}>
              <UIPopover.Button  ref={setReferenceElement}  
                  className={clsx(
                    "px-2 hover:cursor-pointer",
                    iconPosition == "left"? "flex-row-reverse" : "" 
                  )}>
                    { open ?  <XMarkIcon  className="h-6 w-6 opacity-30"/> : <CalendarIcon className="h-6 w-6 opacity-30"/>}
                </UIPopover.Button>
                <div className="hover:cursor-pointer text-right align-middle mx-2">
                  <SelectedDates mode={mode} selected={selected} label={label} onRemove={handleRemoveDate}/>
                </div>
            </div>
            <UIPopover.Panel 
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className={" z-40 mt-2 mb-6 mx-2 rounded-xl bg-white drop-shadow-lg"} 
              >
                
            </UIPopover.Panel>
          </>
        )}
      </UIPopover>
    )
}