import * as array from "../src";

describe("array util", () => {
  describe("deepFlatten", () => {
    test("deepFlatten()", () => {
      const result = array.deepFlatten([1, [2], [[3], 4], 5]);
      expect(result).toStrictEqual([1, 2, 3, 4, 5]);
    });
  });
});
