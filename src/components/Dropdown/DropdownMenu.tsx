import { Fragment } from "react";
import {
  Listbox,
  Transition,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Operator, Property } from "../../data/types";

interface DropdownMenuBaseProps {
  title?: string;
}

interface OperatorDropdownProps extends DropdownMenuBaseProps {
  options: Operator[];
  value: Operator | null;
  type: "operator";
  onChange?: (selected: Operator) => void;
}

interface PropertyDropdownProps extends DropdownMenuBaseProps {
  options: Property[];
  value: Property | null;
  type: "property";
  onChange?: (selected: Property) => void;
}

type DropdownMenuProps = OperatorDropdownProps | PropertyDropdownProps;

export default function DropdownMenu(props: DropdownMenuProps) {
  const getDisplayText = (option: Operator | Property) => {
    if (props.type === "operator") {
      return (option as Operator).text;
    } else {
      return (option as Property).name;
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="font-bold">{props.title}</span>
      <Listbox value={props.value} onChange={props.onChange}>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate pr-3">
              {props.value ? (
                getDisplayText(props.value)
              ) : (
                <span className="text-gray-400">Select an item</span>
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="w-fit absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {props.options.map((option) => (
                <ListboxOption
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {getDisplayText(option)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
