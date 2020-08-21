import * as shared from "../src";

describe("is-empty util", () => {
  describe("isEmptyObject", () => {
    test("isEmptyObject({}) have no value", () => {
      const result = shared.isEmptyObject({});
      expect(result).toBe(true);
    });
    test("isEmptyObject({a:b}) have value", () => {
      const result = shared.isEmptyObject({ a: "b" });
      expect(result).toBe(false);
    });
  });
  describe("isEmptyArray", () => {
    test("isEmptyArray([]) have no value", () => {
      const result = shared.isEmptyArray([]);
      expect(result).toBe(true);
    });
    test("isEmptyArray([1,2]) have value", () => {
      const result = shared.isEmptyArray([1, 2]);
      expect(result).toBe(false);
    });
  });
  describe("isEmpty", () => {
    test("isEmpty() have no value", () => {
      expect(shared.isEmpty([])).toBe(true);
      expect(shared.isEmpty({})).toBe(true);
      expect(shared.isEmpty(null)).toBe(true);
      expect(shared.isEmpty(undefined)).toBe(true);
    });
    test("isEmpty() have value", () => {
      expect(shared.isEmpty([1])).toBe(false);
      expect(shared.isEmpty({ a: 1 })).toBe(false);
      expect(shared.isEmpty("null")).toBe(false);
      expect(shared.isEmpty("undefined")).toBe(false);
    });
  });
});
