import * as object from "../src";

describe("object util", () => {
  describe("omit", () => {
    test("omit()", () => {
      const result = object.omit({ a: 1, b: 2, c: 3, d: 4 }, ["a", "d"]);
      expect(result).toEqual({ b: 2, c: 3 });
    });
    test("omit() with type", () => {
      const result = object.omit<{ [key in string]: number }, string>({ a: 1, b: 2, c: 3, d: 4 }, ["a", "d"]);
      expect(result).toEqual({ b: 2, c: 3 });
    });
    test("omit() with same names", () => {
      const result = object.omit<{ [key in string]: number }, string>({ a: 1, b: 2, c: 3, d: 4 }, ["a", "d", "d", "d"]);
      expect(result).toEqual({ b: 2, c: 3 });
    });
  });
});
