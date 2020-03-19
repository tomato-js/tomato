import * as array from "../src";

describe("all-equal util", () => {
  describe("allEqual", () => {
    test("allEqual() with different content, return false", () => {
      const result = array.allEqual<number>([3, 4, 5, 6]);
      expect(result).toBe(false);
    });
    test("allEqual() with same content, return true", () => {
      const result = array.allEqual<number>([3, 3, 3, 3]);
      expect(result).toBe(true);
    });
  });
});
