import * as math from "../src";

describe("math util", () => {
  describe("sum", () => {
    test("sum() with array", () => {
      const result = math.sum(...[2, 3, 4]);
      expect(result).toBe(9);
    });
    test("sum() with one by one", () => {
      const result = math.sum(2, 3, 4);
      expect(result).toBe(9);
    });
  });
});
