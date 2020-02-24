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
});
