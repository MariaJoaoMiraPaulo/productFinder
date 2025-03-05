import { useMemo, useState } from "react";
import { Header } from "../components/Header/Header";
import { Table } from "../components/Table/Table";
import { datastore } from "../data";
import { filterProducts, normalizeProducts } from "../data/methods";
import { Filter, Operator, Property } from "../data/types";
import { FilterGroup } from "../components/FilterGroup/FilterGroup";

const ProductFinder = () => {
  const properties = datastore.getProperties() as Property[];
  const operators = datastore.getOperators() as Operator[];
  const rawProducts = datastore.getProducts();

  const [currentFilter, setCurrentFilter] = useState<Filter | null>(null);

  const normalizedProducts = useMemo(() => {
    return normalizeProducts(rawProducts, properties);
  }, [rawProducts, properties]);

  const filteredProducts = useMemo(() => {
    return filterProducts(normalizedProducts, currentFilter);
  }, [normalizedProducts, currentFilter]);

  const handleFilterChange = (filter: Filter | null) => {
    setCurrentFilter(filter);
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto my-5">
        <div className="flex gap-2">
          <FilterGroup
            properties={properties}
            operators={operators}
            onFilterChange={handleFilterChange}
          />
        </div>
        <Table products={filteredProducts} />
      </div>
    </div>
  );
};

export { ProductFinder };
