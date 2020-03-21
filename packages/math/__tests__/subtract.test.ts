import * as math from "../src";

describe("math util", () => {
  describe("subtract", () => {
    test("subtract()", () => {
      const result = math.subtract(4, 3);
      expect(result).toBe(1);
    });
    test("subtract() with curry", () => {
      const result = math.subtract(4);
      expect(result(3)).toBe(1);
    });
    test("subtract() with curry twice", () => {
      const result = math.subtract(4);
      expect(result(3)).toBe(1);
      expect(result(2)).toBe(2);
    });
    test("subtract() can not handle float", () => {
      const result = math.subtract(0.3, 0.2);
      expect(result !== 0.1).toBe(true);
    });
  });
});
