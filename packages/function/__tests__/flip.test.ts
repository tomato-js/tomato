import * as func from "../src";

describe("function util", () => {
  describe("flip", () => {
    test("flip()", () => {
      const f = function(a: string, b: string, c: string) {
        return a + " " + b + " " + c;
      };
      const g = func.flip(f);
      const result = g("a", "b", "c");
      expect(result).toBe("c b a");
    });
  });
});
