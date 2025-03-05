import { Fragment, useState } from "react";
import {
  Listbox,
  Transition,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface ValueDropdownProps {
  title?: string;
  propertyType: "string" | "number" | "enumerated";
  possibleValues: (string | number)[];
  onChange?: (value: string | number) => void;
}

export default function ValueDropdown({
  title,
  propertyType,
  possibleValues,
  onChange,
}: ValueDropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    possibleValues.length > 0 ? possibleValues[0] : null
  );
  const [inputValue, setInputValue] = useState("");

  const handleChange = (value: string | number) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      if (propertyType === "number") {
        onChange(parseFloat(e.target.value) || 0);
      } else {
        onChange(e.target.value);
      }
    }
  };

  if (propertyType === "enumerated" && possibleValues.length > 0) {
    return (
      <div className="flex gap-2 items-center">
        <span className="font-bold">{title}</span>
        <Listbox value={selectedValue} onChange={handleChange}>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate pr-3">
                {selectedValue?.toString() || "Select a value"}
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
                {possibleValues.map((value, index) => (
                  <ListboxOption
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {value.toString()}
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

  return (
    <div className="flex gap-2 items-center">
      <span className="font-bold">{title}</span>
      <input
        type={propertyType === "number" ? "number" : "text"}
        value={inputValue}
        onChange={handleInputChange}
        className="px-3 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        placeholder={`Enter ${
          propertyType === "number" ? "a number" : "text"
        }...`}
      />
    </div>
  );
}
