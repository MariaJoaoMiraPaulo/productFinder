export type ProductProperty = {
  property_id: number;
  value: string | number;
};

export type RawProduct = {
  id: number;
  property_values: ProductProperty[];
};

export type Product = {
  id: number;
  productName: string;
  color?: string;
  weight?: number;
  category?: string;
  wireless?: "true" | "false";
};

export type Property = {
  id: number;
  name: string;
  type: "string" | "number" | "enumerated";
  values?: string[];
};

export type Operator = {
  id: number;
  text: string;
};

export type Filter = {
  property: Property;
  operator: Operator;
  value: string | number | string[];
};
