import * as math from "../src";

describe("math util", () => {
  describe("divide", () => {
    test("divide()", () => {
      const result = math.divide(12, 3);
      expect(result).toBe(4);
    });
    test("divide() with curry", () => {
      const result = math.divide(12);
      expect(result(3)).toBe(4);
    });
    test("divide() with curry twice", () => {
      const result = math.divide(12);
      expect(result(3)).toBe(4);
      expect(result(2)).toBe(6);
    });
    test("divide() can not handle float", () => {
      const result = math.divide(0.99, 0.3);
      expect(result !== 3.3).toBe(true);
    });
  });
});
