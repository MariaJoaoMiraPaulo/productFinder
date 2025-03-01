import { Header } from "../components/Header/Header";
import { Table } from "../components/Table/Table";
import { datastore } from "../data";
import { normalizeProducts } from "../data/methods";
import { Property } from "../data/types";

const ProductFinder = () => {
  const normalizedProducts = normalizeProducts(
    datastore.getProducts(),
    datastore.getProperties() as Property[]
  );

  return (
    <div>
      <Header />
      <Table products={normalizedProducts} />
    </div>
  );
};

export { ProductFinder };
