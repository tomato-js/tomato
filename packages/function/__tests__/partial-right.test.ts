import * as func from "../src";

describe("function util", () => {
  describe("partialRight", () => {
    test("partialRight()", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partialRight(compute, [6, 2]);
      const result = f(12, 3);
      expect(result).toBe(15);
    });
    test("partialRight() with one param", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partialRight(compute, [2]);
      const result = f(12, 3, 6);
      expect(result).toBe(15);
    });
    test("partialRight() with three params", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partialRight(compute, [3, 6, 2]);
      const result = f(12);
      expect(result).toBe(15);
    });
    test("partialRight() twice", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partialRight(compute, [6, 2]);
      const g = func.partialRight(f, [3]);
      const result = g(12);
      expect(result).toBe(15);
    });
  });
});
