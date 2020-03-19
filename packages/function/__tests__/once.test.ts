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
    test("once() without type", () => {
      let num = "2";
      const add = () => (num = num + 1);
      const addOnce = func.once(add);
      addOnce();
      addOnce();
      addOnce();
      expect(num).toBe("21");
    });
  });
});
