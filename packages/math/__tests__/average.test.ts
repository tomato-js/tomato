import * as math from "../src";

describe("math util", () => {
  describe("average", () => {
    test("average() with array", () => {
      const result = math.average(...[2, 3, 4]);
      expect(result).toBe(3);
    });
    test("average() with one by one", () => {
      const result = math.average(2, 3, 4);
      expect(result).toBe(3);
    });
  });
});
