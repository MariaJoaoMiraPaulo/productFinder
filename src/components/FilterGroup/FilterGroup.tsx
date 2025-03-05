import { useState, useEffect, useMemo, useCallback } from "react";
import DropdownMenu from "../Dropdown/DropdownMenu";
import ValueDropdown from "../Dropdown/ValueDropdown";
import { Filter, Operator, Property } from "../../data/types";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FilterGroupProps {
  properties: Property[];
  operators: Operator[];
  onFilterChange: (filter: Filter | null) => void;
}

const mappedOperators: Record<string, string[]> = {
  string: ["equals", "any", "none", "in", "contains"],
  number: ["equals", "greater_than", "less_than", "any", "none", "any"],
  enumerated: ["equals", "any", "none", "any"],
};

const FilterGroup = ({
  properties,
  operators,
  onFilterChange,
}: FilterGroupProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    null
  );
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );

  const [possibleValues, setPossibleValues] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (selectedProperty) {
      if (selectedProperty.type === "enumerated" && selectedProperty.values) {
        setPossibleValues(selectedProperty.values);
      } else {
        setPossibleValues([]);
      }

      setSelectedValue(null);
    }
  }, [selectedProperty]);

  const handlePropertyChange = (property: Property) => {
    setSelectedProperty(property);
    setSelectedOperator(null);
    setSelectedValue(null);
    onFilterChange(null);
  };

  const handleOperatorChange = (operator: Operator) => {
    setSelectedOperator(operator);

    if (operator.id === "any" || operator.id === "none") {
      setSelectedValue(null);
      onFilterChange({
        property: selectedProperty!,
        operator: operator,
        value: null,
      });
    } else {
      if (selectedProperty) {
        const shouldResetValue = selectedValue !== null;
        setSelectedValue(shouldResetValue ? null : selectedValue);
      }
    }
  };

  const handleValueChange = useCallback(
    (value: string | number) => {
      setSelectedValue(value);

      if (selectedProperty && selectedOperator) {
        onFilterChange({
          property: selectedProperty,
          operator: selectedOperator,
          value: value,
        });
      }
    },
    [selectedProperty, selectedOperator, onFilterChange]
  );

  const cleanUpFilters = () => {
    setSelectedProperty(null);
    setSelectedOperator(null);
    setSelectedValue(null);
    onFilterChange(null);
  };

  const showValueDropdown =
    selectedOperator &&
    selectedProperty &&
    selectedOperator.id !== "any" &&
    selectedOperator.id !== "none";

  const validOperators = useMemo(() => {
    if (!selectedProperty) {
      return operators;
    } else {
      return operators.filter((operator) =>
        mappedOperators[selectedProperty?.type].includes(operator.id)
      );
    }
  }, [selectedProperty, operators]);

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between w-full">
      <div className="flex gap-2">
        <DropdownMenu
          title="Category"
          type="property"
          options={properties}
          onChange={handlePropertyChange}
          value={selectedProperty}
        />

        <DropdownMenu
          title="Operator"
          type="operator"
          options={validOperators}
          onChange={handleOperatorChange}
          value={selectedOperator}
        />

        {showValueDropdown && (
          <ValueDropdown
            title="Value"
            propertyType={selectedProperty.type}
            possibleValues={possibleValues}
            onChange={handleValueChange}
          />
        )}
      </div>

      <XMarkIcon
        className="w-7 cursor-pointer border-1"
        onClick={cleanUpFilters}
      />
    </div>
  );
};

export { FilterGroup };
