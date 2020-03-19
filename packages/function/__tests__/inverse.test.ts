import * as func from "../src";

describe("function util", () => {
  describe("inverse", () => {
    test("inverse()", () => {
      const isNil = (val: any) => val === undefined && val === null;
      const isNotNil = func.inverse(isNil);
      expect(isNotNil(1)).toBe(true);
    });
    test("inverse() with number", () => {
      const isEven = (x: number) => x % 2 === 0;
      const isOdd = func.inverse(isEven);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
    });
    test("inverse() with boolean", () => {
      const isTrue = () => true;
      const isFalse = func.inverse(isTrue);
      expect(isTrue()).toBe(true);
      expect(isFalse()).toBe(false);
    });
  });
});
