import * as math from "../src";

describe("math util", () => {
  describe("add", () => {
    test("add()", () => {
      const result = math.add(3, 4);
      expect(result).toBe(7);
    });
    test("add() with curry", () => {
      const result = math.add(3);
      expect(result(4)).toBe(7);
    });
    test("add() with curry twice", () => {
      const result = math.add(3);
      expect(result(4)).toBe(7);
      expect(result(2)).toBe(5);
    });
    test("add() can not handle float", () => {
      const result = math.add(0.1, 0.2);
      expect(result !== 0.3).toBe(true);
    });
  });
});
