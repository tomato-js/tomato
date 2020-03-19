import * as func from "../src";

describe("function util", () => {
  describe("curry", () => {
    test("curry() a single value", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.curry(compute);
      const g = f(12);
      const result = g(3, 6, 2);
      expect(result).toBe(15);
    });
    test("curry() multi values", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.curry(compute);
      const g = f(12, 3);
      const result = g(6, 2);
      expect(result).toBe(15);
    });
    test("curry() multi times", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.curry(compute);
      const g = f(12);
      const h = g(3);
      const result = h(6, 2);
      expect(result).toBe(15);
    });
  });
});
