import { Filter, Product, Property, RawProduct } from "./types";

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

export const getPropertyKey = (propertyName: string): keyof Product => {
  const key = PropertyNameMapping[propertyName];
  if (key) {
    return key;
  }

  throw Error("Provided property key is not valid");
};

export const filterProducts = (
  products: Product[],
  filter: Filter | null
): Product[] => {
  let valuesArray: string[];

  if (!filter || filter.value === "") {
    return products;
  }

  const { property, operator, value } = filter;

  const propertyKey = getPropertyKey(property.name);

  if (operator.id === "in") {
    valuesArray = value
      ? value
          .toString()
          .split(",")
          .map((v) => v.toLocaleLowerCase().replace(" ", ""))
      : [];
  }

  return products.filter((product) => {
    const productValue = product[propertyKey];

    if (operator.id === "any") {
      return productValue !== undefined;
    }

    if (operator.id === "none") {
      return productValue === undefined;
    }

    switch (operator.id) {
      case "equals":
        return typeof productValue === "number"
          ? productValue === value
          : productValue?.toLowerCase() === String(value).toLocaleLowerCase();
      case "greater_than":
        return typeof productValue === "number" && productValue > Number(value);
      case "less_than":
        return typeof productValue === "number" && productValue < Number(value);
      case "in":
        return (
          Array.isArray(valuesArray) &&
          valuesArray.includes(String(productValue).toLocaleLowerCase())
        );

      case "contains":
        return (
          typeof productValue === "string" &&
          typeof value === "string" &&
          productValue.toLowerCase().includes(value.toLowerCase())
        );
      default:
        return true;
    }
  });
};
