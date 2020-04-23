import * as math from "../src";

describe("math util", () => {
  describe("multiply", () => {
    test("multiply()", () => {
      const result = math.multiply(4, 3);
      expect(result).toBe(12);
    });
    test("multiply() with curry", () => {
      const result = math.multiply(4);
      expect(result(3)).toBe(12);
    });
    test("multiply() with curry twice", () => {
      const result = math.multiply(4);
      expect(result(3)).toBe(12);
      expect(result(2)).toBe(8);
    });
    test("multiply() can not handle float", () => {
      const result = math.multiply(0.1, 0.2);
      expect(result !== 0.02).toBe(true);
    });
  });
});
