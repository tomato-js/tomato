import * as math from "../src";

describe("math util", () => {
  describe("average0by", () => {
    test("averageBy() with array", () => {
      const result = math.averageBy([{ a: 1 }, { a: 2 }, { a: 3 }], o => o.a);
      expect(result).toBe(2);
    });
  });
});
