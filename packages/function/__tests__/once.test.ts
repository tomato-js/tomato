import * as func from "../src";

describe("function util", () => {
  describe("once", () => {
    test("once()", () => {
      let num = 1;
      const add = () => num++;
      const addOnce = func.once<number>(add);
      addOnce();
      addOnce();
      addOnce();
      expect(num).toBe(2);
    });
  });
});
