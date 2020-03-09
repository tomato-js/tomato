import * as array from "../src";

describe("array util", () => {
  describe("countOccurrences", () => {
    test("countOccurrences() with number[]", () => {
      const result = array.countOccurrences([3, 3, 2], 3);
      expect(result).toBe(2);
    });
    test("countOccurrences() with string[]", () => {
      const result = array.countOccurrences(["3", 3, 2], "3");
      expect(result).toBe(1);
    });
  });
});
