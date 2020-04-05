import * as object from "../src";

describe("object util", () => {
  describe("deepClone", () => {
    const fixture1 = { a: 1, b: 2, c: [1, 2, 3, { e: 5, f: [{ g: 1 }, { h: 8 }], i: 9 }], j: 10, func: (v: number) => 10 + v };
    const fixture2 = [1, 2, 3, { a: 1, b: 2, c: ["e", { f: 6 }], g: 7 }, 4];
    const fixture3 = () => 12;
    test("deepClone object", () => {
      const result = object.deepClone(fixture1);
      expect(result.c[3].f[0].g).toBe(1);
      expect(result.c[3].f[1].h).toBe(8);
      expect(result.c[3].i).toBe(9);
      expect(result.j).toBe(10);
    });
    test("deepClone array", () => {
      const result = object.deepClone(fixture2);
      expect(result[2]).toBe(3);
      expect(result[1]).toBe(2);
      expect(result[3].b).toBe(2);
      expect(result[3].c[1].f).toBe(6);
    });
    test("deepClone object do not change origin", () => {
      const result = object.deepClone(fixture1);
      result.a = 2;
      expect(fixture1.a).toBe(1);
      expect(result.a).toBe(2);
    });
    test("deepClone object with function", () => {
      const result = object.deepClone(fixture1);
      expect(result["func"](2)).toBe(12);
    });
    test("deepClone function", () => {
      const result = object.deepClone(fixture3);
      expect(result()).toBe(12);
    });
  });
});
