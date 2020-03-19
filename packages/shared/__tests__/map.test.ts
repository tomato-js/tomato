import * as shared from "../src";

describe("shared util", () => {
  describe("map", () => {
    test("map([])", () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const arr2 = shared.map(array, (k, v) => v + 1);
      expect(arr2).toStrictEqual([2, 3, 4, 5, 6, 7, 8]);
    });
    test("map() will not change itself", () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const arr2 = shared.map(array, (k, v) => v + 1);
      expect(array).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
    });
    test("map({})", () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const obj = {
        a: 1,
        b: 2
      };
      const obj2 = shared.map(obj, (k, v) => v + 1);
      expect(obj2).toStrictEqual({
        a: 2,
        b: 3
      });
    });
  });
});
