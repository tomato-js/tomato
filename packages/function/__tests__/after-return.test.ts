import * as func from "../src";

describe("function util", () => {
  describe("afterReturn", () => {
    test("afterReturn()", () => {
      let origin = () => {
        return "origin";
      };
      const target = (string: string) => {
        return `after1_${string}`;
      };
      origin = func.afterReturn(origin, target);
      expect(origin()).toBe("after1_origin");
    });
    test("afterReturn() muitl times", () => {
      let origin = () => {
        return "origin";
      };
      const target = (string: string) => {
        return `after1_${string}`;
      };
      const target2 = (string: string) => {
        return `after2_${string}`;
      };
      origin = func.afterReturn(origin, target);
      origin = func.afterReturn(origin, target2);
      expect(origin()).toBe("after2_after1_origin");
    });
    test("afterReturn() with no function should throw error", () => {
      const throwThis = () => func.afterReturn({} as Function, {} as Function);
      expect(throwThis).toThrow();
    });
  });
});
