import { Popover as UIPopover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, ReactNode, useRef } from 'react'

type TooltipProps = {
  hoverable : ReactNode 
  content : ReactNode 
};

export const Tooltip = ({ hoverable, content } : TooltipProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const timeoutDuration = 100;
  let timeout : number;

  const closeTooltip = () => {
    return divRef.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true
      })
    )
  }

  const onMouseEnter = (open : boolean) => {
    clearTimeout(timeout)
    if (open) return
    return divRef.current?.click()
  }

  const onMouseLeave = (open : boolean) => {
    if (!open) return
    timeout = setTimeout(() => closeTooltip(), timeoutDuration)
  }

  return (
      <UIPopover className="relative">
        {({ open }) => (
          <>
          <UIPopover.Button
            ref={divRef}
            as='div'
            className={`
            ${open ? "" : "text-opacity-90"}`}
            onMouseEnter={()=>onMouseEnter(open)}
            onMouseLeave={()=>onMouseLeave(open)}
          >
            {hoverable}
          </UIPopover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <UIPopover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                {content}
              </UIPopover.Panel>
            </Transition>
          </>
        )}
      </UIPopover>
  )
}