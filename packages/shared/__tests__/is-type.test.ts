import * as shared from "../src";

describe("is-empty util", () => {
  describe("isNumber", () => {
    test("isNumber(6) return true", () => {
      const result = shared.isNumber(6);
      expect(result).toBe(true);
    });
    test("iisNumber('6') return false", () => {
      const result = shared.isNumber("6");
      expect(result).toBe(false);
    });
  });
  describe("isString", () => {
    test("isString(6) return false", () => {
      const result = shared.isString(6);
      expect(result).toBe(false);
    });
    test("isString('6') return true", () => {
      const result = shared.isString("6");
      expect(result).toBe(true);
    });
  });
  describe("isArray", () => {
    test("isArray([]) return true", () => {
      const result = shared.isArray([]);
      expect(result).toBe(true);
    });
    test("isArray({}) return false", () => {
      const result = shared.isArray({});
      expect(result).toBe(false);
    });
    test("isArray({}) return false without Array.isArray method", () => {
      (Array.isArray as any) = null;
      const result = shared.isArray({});
      expect(result).toBe(false);
    });
  });
  describe("isObject", () => {
    test("isObject([]) return true", () => {
      const result = shared.isObject([]);
      expect(result).toBe(true);
    });
    test("isObject({}) return true", () => {
      const result = shared.isObject({});
      expect(result).toBe(true);
    });
    test("isObject(null) retur nfalse", () => {
      const result = shared.isObject(null);
      expect(result).toBe(false);
    });
  });
});
