import * as array from "../src";

describe("all-equal util", () => {
  describe("filterNonUnique", () => {
    test("filterNonUnique()", () => {
      const result = array.filterNonUnique([3, 3, 5, 6]);
      expect(result).toStrictEqual([3, 5, 6]);
    });
  });
});
