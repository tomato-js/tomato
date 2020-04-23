import * as func from "../src";

describe("function util", () => {
  describe("compose", () => {
    test("compose()", () => {
      const step1 = (x: number) => (x ? 1 : 2);
      const step2 = (x: number) => (x === 1 ? 3 : 4);
      const step3 = (x: number) => (x === 3 ? 5 : 6);
      const getResult = func.compose(step3, step2, step1);
      const result = getResult(1);
      expect(result).toBe(5);
    });
  });
});
