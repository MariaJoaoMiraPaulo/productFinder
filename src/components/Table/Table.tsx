import { Product } from "../../data/types";

interface TableProps {
  products: Product[];
}

const Table = ({ products }: TableProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Product List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Weight (oz)</th>
              <th className="px-4 py-2 text-left">Wireless</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{product.productName}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.color}</td>
                <td className="px-4 py-2">{product.weight}</td>
                <td className="px-4 py-2">{product.wireless}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Table };
