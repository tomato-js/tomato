import * as element from "../src";

describe("element util", () => {
  const nodeNotExist = null;
  describe("bottomVisible", () => {
    test("bottomVisible()", () => {
      (window.scrollY as any) = -1;
      const result = element.bottomVisible();
      expect(result).toBe(false);
    });
    test("bottomVisible()", () => {
      (window.scrollY as any) = 1;
      const result = element.bottomVisible();
      expect(result).toBe(true);
    });
  });
});
