import * as math from "../src";

describe("math util", () => {
  describe("sumBy", () => {
    test("sumBy() with array", () => {
      const result = math.sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], o => o.a);
      expect(result).toBe(6);
    });
  });
});
