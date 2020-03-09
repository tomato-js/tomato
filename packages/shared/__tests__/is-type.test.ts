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
  describe("isNull", () => {
    test("isNull(null)", () => {
      const result = shared.isNull(null);
      expect(result).toBe(true);
    });
  });
  describe("isUndefined", () => {
    test("isUndefined(undefined)", () => {
      const result = shared.isUndefined(undefined);
      expect(result).toBe(true);
    });
  });
  describe("isNil", () => {
    test("isNil(undefined)", () => {
      const result = shared.isNil(undefined);
      expect(result).toBe(true);
    });
    test("isNil(null)", () => {
      const result = shared.isNil(null);
      expect(result).toBe(true);
    });
    test("isNil({})", () => {
      const result = shared.isNil({});
      expect(result).toBe(false);
    });
  });
});
