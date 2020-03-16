import * as array from "../src";

describe("array util", () => {
  describe("find", () => {
    test("find()", () => {
      const result = array.find([1, 2, 3], (v: number) => v % 2 === 0); // 2
      expect(result).toBe(2);
    });
    test("find() a object list", () => {
      const inventory = [
        { name: "apples", quantity: 2 },
        { name: "bananas", quantity: 0 },
        { name: "cherries", quantity: 5 }
      ];
      function isCherries(fruit: any) {
        return fruit.name === "cherries";
      }
      const result = array.find(inventory, isCherries);
      expect(result).toStrictEqual({ name: "cherries", quantity: 5 });
    });
  });
});
