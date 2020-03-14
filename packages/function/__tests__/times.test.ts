import * as func from "../src";

describe("function util", () => {
  describe("times", () => {
    test("times()", () => {
      let num = 0;
      func.times(4, () => num++);
      expect(num).toBe(4);
    });
  });
});
