import { Product, Property, RawProduct } from "./types";

const PropertyNameMapping: Record<string, keyof Product> = {
  "Product Name": "productName",
  color: "color",
  "weight (oz)": "weight",
  category: "category",
  wireless: "wireless",
};

export const normalizeProducts = (
  products: RawProduct[],
  properties: Property[]
): Product[] => {
  return products.map((product) => {
    const flatProduct: Partial<Product> = { id: product.id };
    product.property_values.forEach((property) => {
      const prop = properties.find((p) => p.id === property.property_id);
      if (prop) {
        let value: string | number | undefined;
        switch (prop.type) {
          case "string":
            value = String(property.value);
            break;
          case "number":
            value = Number(property.value);
            break;
          case "enumerated":
            value = property.value;
            break;
          default:
            value = undefined;
            break;
        }
        if (value) {
          (flatProduct[PropertyNameMapping[prop.name]] as string | number) =
            value;
        }
      }
    });

    return flatProduct as Product;
  });
};
