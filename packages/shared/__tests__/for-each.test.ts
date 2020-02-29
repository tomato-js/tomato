import * as shared from "../src";

describe("for-each util", () => {
  describe("forEach", () => {
    test("forEach([])", () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const arr2: any = [];
      shared.forEach(array, (k, v) => arr2.push(v + 1));
      expect(arr2).toStrictEqual([2, 3, 4, 5, 6, 7, 8]);
    });
    test("forEach({})", () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const obj = {
        a: 1,
        b: 2
      };
      const obj2: any = {};
      shared.forEach(obj, (k, v) => (obj2[v] = k));
      expect(obj2).toStrictEqual({
        1: "a",
        2: "b"
      });
    });
  });
});
