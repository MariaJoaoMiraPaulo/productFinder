import { describe, it, expect } from "vitest";
import { normalizeProducts, filterProducts, getPropertyKey } from "./methods";
import { RawProduct, Property, Filter } from "./types";

describe("Methods", () => {
  const mockProperties: Property[] = [
    { id: 1, name: "Product Name", type: "string" },
    { id: 2, name: "color", type: "string" },
    { id: 3, name: "weight (oz)", type: "number" },
    { id: 4, name: "category", type: "enumerated" },
    { id: 5, name: "wireless", type: "string" },
  ];

  const mockRawProducts: RawProduct[] = [
    {
      id: 11,
      property_values: [
        { property_id: 1, value: "Wireless Headphones" },
        { property_id: 2, value: "Black" },
        { property_id: 3, value: "5.2" },
        { property_id: 4, value: "Electronics" },
      ],
    },
    {
      id: 22,
      property_values: [
        { property_id: 1, value: "Bluetooth Speaker" },
        { property_id: 2, value: "Blue" },
        { property_id: 3, value: "8.5" },
        { property_id: 4, value: "Electronics" },
      ],
    },
  ];

  describe("normalizeProducts", () => {
    it("should correctly normalize products", () => {
      const normalizedProducts = normalizeProducts(
        mockRawProducts,
        mockProperties
      );

      expect(normalizedProducts).toHaveLength(2);
      expect(normalizedProducts[0]).toEqual({
        id: 11,
        productName: "Wireless Headphones",
        color: "Black",
        weight: 5.2,
        category: "Electronics",
      });

      expect(normalizedProducts[1]).toEqual({
        id: 22,
        productName: "Bluetooth Speaker",
        color: "Blue",
        weight: 8.5,
        category: "Electronics",
      });
    });
  });

  describe("getPropertyKey", () => {
    it("should return correct property key", () => {
      expect(getPropertyKey("Product Name")).toBe("productName");
      expect(getPropertyKey("color")).toBe("color");
    });

    it("should throw error for invalid property name", () => {
      expect(() => getPropertyKey("invalid property")).toThrowError(
        "Provided property key is not valid"
      );
    });
  });

  describe("filterProducts", () => {
    const mockNormalizedProducts = normalizeProducts(
      mockRawProducts,
      mockProperties
    );

    it("should return all products when no filter is provided", () => {
      const filteredProducts = filterProducts(mockNormalizedProducts, null);
      expect(filteredProducts).toHaveLength(2);
    });

    it('should filter by "equals" operator for string properties', () => {
      const filter: Filter = {
        property: { id: 1, name: "Product Name", type: "string" },
        operator: { id: "equals", text: "Equals" },
        value: "Wireless Headphones",
      };

      const filteredProducts = filterProducts(mockNormalizedProducts, filter);
      expect(filteredProducts).toHaveLength(1);
      expect(filteredProducts[0].productName).toBe("Wireless Headphones");
    });

    it('should filter by "greater_than" operator for number properties', () => {
      const filter: Filter = {
        property: { id: 3, name: "weight (oz)", type: "number" },
        operator: { id: "greater_than", text: "Greater Than" },
        value: 6,
      };

      const filteredProducts = filterProducts(mockNormalizedProducts, filter);
      expect(filteredProducts).toHaveLength(1);
      expect(filteredProducts[0].productName).toBe("Bluetooth Speaker");
    });

    it('should filter by "contains" operator', () => {
      const filter: Filter = {
        property: { id: 1, name: "Product Name", type: "string" },
        operator: { id: "contains", text: "Contains" },
        value: "Speaker",
      };

      const filteredProducts = filterProducts(mockNormalizedProducts, filter);
      expect(filteredProducts).toHaveLength(1);
      expect(filteredProducts[0].productName).toBe("Bluetooth Speaker");
    });

    it('should handle "any" operator', () => {
      const filter: Filter = {
        property: { id: 2, name: "color", type: "string" },
        operator: { id: "any", text: "Any" },
        value: null,
      };

      const filteredProducts = filterProducts(mockNormalizedProducts, filter);
      expect(filteredProducts).toHaveLength(2);
    });

    it('should handle "none" operator', () => {
      const filter: Filter = {
        property: { id: 2, name: "color", type: "string" },
        operator: { id: "none", text: "None" },
        value: null,
      };

      const filteredProducts = filterProducts(mockNormalizedProducts, filter);
      expect(filteredProducts).toHaveLength(0);
    });

    it('should handle "in" operator', () => {
      const filter: Filter = {
        property: { id: 4, name: "category", type: "enumerated" },
        operator: { id: "in", text: "In" },
        value: "Electronics, Mobile",
      };

      const filteredProducts = filterProducts(mockNormalizedProducts, filter);
      expect(filteredProducts).toHaveLength(2);
    });
  });
});
