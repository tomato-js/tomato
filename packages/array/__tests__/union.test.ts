import * as array from "../src";

describe("array util", () => {
  describe("union", () => {
    test("union() one array", () => {
      const result = array.union([1, 2, 3, 4]);
      expect(result).toStrictEqual([1, 2, 3, 4]);
    });
    test("union() one array with same item", () => {
      const result = array.union([1, 2, 2, 4]);
      expect(result).toStrictEqual([1, 2, 4]);
    });
    test("union() one array with diff type", () => {
      const result = array.union(["1", "2", 2, "4"]);
      expect(result).toStrictEqual(["1", "2", 2, "4"]);
    });
    test("union() multi array", () => {
      const result = array.union([1, 2, 3, 4], ...[2, 3, 4, 5], ...[3, 4, 5, 6]);
      expect(result).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
