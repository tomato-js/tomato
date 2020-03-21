import * as func from "../src";

describe("function util", () => {
  describe("partial", () => {
    test("partial()", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partial(compute, [12, 3]);
      const result = f(6, 2);
      expect(result).toBe(15);
    });
    test("partial() with one param", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partial(compute, [12]);
      const result = f(3, 6, 2);
      expect(result).toBe(15);
    });
    test("partial() with three params", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partial(compute, [12, 3, 6]);
      const result = f(2);
      expect(result).toBe(15);
    });
    test("partial() twice", () => {
      function compute(a: number, b: number, c: number, d: number) {
        return (a + b * c) / d;
      } // f(12, 3, 6, 2) == 15
      const f = func.partial(compute, [12, 3]);
      const g = func.partial(f, [6]);
      const result = g(2);
      expect(result).toBe(15);
    });
  });
});
